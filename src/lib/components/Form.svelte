<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import DiscoButton from '$lib/components/DiscoButton.svelte';

	export let title: string;
	export let form: {
		username: string | File | null;
		error: boolean;
		message: string;
	} | null;
	export let actionLabel: string;
	export let linkHref: string;
	export let linkLabel: string;

	let busy = false;
</script>

<div class="form">
	<h1>{title}</h1>
	{#if form?.error}<p class="error">{form.message}</p>{/if}
	<form
		method="post"
		use:enhance={() => {
			busy = true;

			return async ({ result }) => {
				busy = false;
				await applyAction(result);
			};
		}}
	>
		<slot />
		<DiscoButton {busy} type="submit"><span class="submit">{actionLabel}</span></DiscoButton>
	</form>
	<a class="link" href={linkHref}>{linkLabel}</a>
</div>

<style lang="scss">
	@use '$lib/common' as common;

	.form {
		padding: 64px 0;
		max-width: 320px;
		margin: auto;
	}

	h1 {
		font-family: 'Archivo';
		font-weight: 500;
		font-size: 28px;
		line-height: 36px;
	}

	.error {
		@include common.font-size-14;
		color: var(--red-11);
		margin-bottom: 8px;
	}

	.submit {
		@include common.font-size-14;
	}

	.link {
		@include common.font-size-14;
		display: block;
		margin-top: 12px;
		color: var(--sand-11);

		&:hover {
			color: var(--sand-12);
		}
	}
</style>
