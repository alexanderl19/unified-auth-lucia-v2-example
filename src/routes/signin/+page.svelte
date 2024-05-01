<script lang="ts">
	import type { ActionData } from './$types';
	import Form from '$lib/components/Form.svelte';
	import LabelInput from '$lib/components/LabelInput.svelte';

	export let form: ActionData;
</script>

<Form title="Sign In" {form} actionLabel="Sign In" linkHref="/signup" linkLabel="Create an account">
	<LabelInput
		label="Username"
		name="username"
		autocomplete="username"
		value={form?.username ?? ''}
	/>
	<LabelInput label="Password" name="password" type="password" autocomplete="current-password" />
</Form>
