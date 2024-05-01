<script lang="ts">
	import { enhance } from '$app/forms';
	import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
	import {
		dictionary as zxcvbnCommonPackageDictionary,
		adjacencyGraphs as zxcvbnCommonPackageAdjacencyGraphs,
	} from '@zxcvbn-ts/language-common';
	import {
		dictionary as zxcvbnEnPackageDictionary,
		translations as zxcvbnEnPackageTranslations,
	} from '@zxcvbn-ts/language-en';

	const options = {
		dictionary: {
			...zxcvbnCommonPackageDictionary,
			...zxcvbnEnPackageDictionary,
		},
		graphs: zxcvbnCommonPackageAdjacencyGraphs,
		translations: zxcvbnEnPackageTranslations,
	};

	const run = async (password: string, userInputs?: (string | number)[]) => {
		zxcvbnOptions.setOptions(options);
		const results = zxcvbn(password, userInputs);
		return results;
	};

	let username = '';
	let password = '';
	$: zxcvbnResults = run(password, [username]);
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input bind:value={username} name="username" id="username" /><br />
	<label for="password">Password</label>
	<input bind:value={password} type="password" name="password" id="password" /><br />
	<input type="submit" />
</form>
{#await zxcvbnResults then results}
	{results.score}
	{results.feedback.warning}
	{#each results.feedback.suggestions as suggestion}
		{suggestion}
	{/each}
{/await}
<a href="/signin">Sign in</a>
