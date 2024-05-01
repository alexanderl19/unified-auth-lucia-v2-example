<script lang="ts">
	import 'color';

	import { Footer } from 'ui/components';
	import { BodyClasses } from 'ui/theme';
</script>

<BodyClasses />

<svelte:head>
	<link href="/fonts/inter/inter.css" rel="stylesheet" />
	<link href="/fonts/archivo/archivo.css" rel="stylesheet" />

	<title>Alexander Liu</title>
	<meta property="og:title" content="Alexander Liu" />
</svelte:head>

<div class="content">
	<div>
		<slot />
	</div>
	<Footer />
</div>

<style lang="scss">
	:global(body) {
		// Causes inconsistent font sizes on iOS Safari when in landscape
		-webkit-text-size-adjust: 100%;
		margin: 0;
		margin: 0 0 env(safe-area-inset-bottom, 0px) 0;
		font-family: 'Inter', sans-serif;

		@supports (font-variation-settings: normal) {
			font-family: 'Inter var', sans-serif;
		}
	}

	.content {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
