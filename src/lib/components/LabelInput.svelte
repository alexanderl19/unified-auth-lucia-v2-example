<script lang="ts">
	export let label: string;
	export let name: string;
</script>

<label>
	<span>{label}</span>
	<input {name} {...$$restProps} />
</label>

<style lang="scss">
	@use '$lib/common' as common;

	label {
		display: flex;
		flex-direction: column;
		margin-bottom: 16px;

		span {
			@include common.font-size-14;
			margin-bottom: 8px;
		}

		input {
			all: unset;
			box-sizing: border-box;
			width: 100%;
			padding: 8px;
			cursor: text;
			background-color: var(--sand-2);
			border: 1px solid var(--sand-6);
			border-radius: 6px;

			&:focus {
				border: 1px solid var(--blue-7);
			}
		}
	}
</style>
