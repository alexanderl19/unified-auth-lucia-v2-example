import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { auth } from '$lib/server/auth';

const allowedCallbackURIs = ['https://receipts.alexanderliu.com/auth/callback'];

export const load = (async ({ locals, url }) => {
	const session = await locals.auth.validate();
	const callbackURI = url.searchParams.get('callback');
	const redirectURI = url.searchParams.get('redirect');
	if (callbackURI && !allowedCallbackURIs.includes(callbackURI)) {
		error(400);
	}

	if (callbackURI && !redirectURI) {
		error(400);
	}

	if (callbackURI && session) {
		if (!redirectURI) {
			throw error(400);
		}

		const url = new URL(callbackURI);
		url.searchParams.set('session', session.sessionId);
		url.searchParams.set('redirect', redirectURI);

		redirect(302, url);
	}

	if (session) redirect(302, '/');
	return {};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const callbackURI = url.searchParams.get('callback');
		const redirectURI = url.searchParams.get('redirect');

		if (callbackURI && !allowedCallbackURIs.includes(callbackURI)) {
			error(400);
		}

		// basic check
		if (typeof username !== 'string' || username.length < 1 || username.length > 31) {
			return fail(400, {
				username,
				error: true,
				message: 'Invalid username',
			});
		}
		if (typeof password !== 'string' || password.length < 1 || password.length > 255) {
			return fail(400, {
				username,
				error: true,
				message: 'Invalid password',
			});
		}

		let session;
		try {
			// find user by key
			// and validate password
			const key = await auth.useKey('username', username.toLowerCase(), password);
			session = await auth.createSession({
				userId: key.userId,
				attributes: {},
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					username,
					error: true,
					message: 'Incorrect username or password',
				});
			}
			return fail(500, {
				username,
				error: true,
				message: 'An unknown error occurred',
			});
		}

		if (callbackURI && session) {
			if (!redirectURI) {
				throw error(400);
			}

			const url = new URL(callbackURI);
			url.searchParams.set('session', session.sessionId);
			url.searchParams.set('redirect', redirectURI);

			redirect(302, url);
		}

		// redirect to
		// make sure you don't throw inside a try/catch block!
		redirect(302, '/');
	},
} satisfies Actions;
