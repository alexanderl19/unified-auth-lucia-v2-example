import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { pg } from '@lucia-auth/adapter-postgresql';

import { pool } from '$lib/server/db';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	adapter: pg(pool, {
		user: 'auth_user',
		key: 'user_key',
		session: 'user_session',
	}),
	middleware: sveltekit(),
	getUserAttributes: (data) => {
		return {
			username: data.username,
		};
	},
});

export type Auth = typeof auth;
