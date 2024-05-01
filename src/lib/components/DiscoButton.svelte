<!-- https://github.com/joe-bell/loading-disco -->
<!-- Apache License 2.0 -->
<!-- https://github.com/joe-bell/loading-disco/blob/048fa9e053e8a3c83f629f2fc313e0b25d8f152d/LICENSE -->

<script lang="ts">
	export let busy = false;
	export let aspectRatio = 5;
</script>

<button class:is-busy={busy} style:--button-aspect-ratio={aspectRatio} {...$$restProps}>
	<span class="content">
		<span {...busy ? { role: 'progressbar' } : {}} aria-hidden={!busy}>
			<slot />
		</span>
	</span>
	<span aria-hidden class="disco" />
</button>

<style lang="scss">
	@keyframes disco {
		from {
			transform: translateY(-50%) rotate(0deg);
		}
		to {
			transform: translateY(-50%) rotate(360deg);
		}
	}

	$button-aspect-ratio: var(--button-aspect-ratio);
	$button-color-bg: var(--sand-3);
	$button-color-border: var(--sand-7);
	$button-color-disco: var(--blue-8);
	$button-color-text-busy: var(--sand-12);
	$button-border-width: 1px;
	$button-disco-animation: disco 1250ms linear infinite;
	$button-disco-gradient-stops:
		transparent 135deg,
		$button-color-disco 180deg,
		transparent 225deg;
	$button-disco-opacity: 1;
	$button-radius: 6px;
	$button-transition-duration: 50ms;
	$button-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
	$button-transition: $button-transition-duration $button-transition-easing;
	$button-aspect-ratio-multiplier: 1;

	button {
		/* Customizable */
		--button-color-text: var(--sand-12);

		/**
   * Using an advance mathematic technique often referred to as
   * "winging it", we'll offset the aspect ratio by a figure
   * that brings the shape of the "disco" element as close to
   * the edge of the button as possible – to reduce the effect
   * of "easing".
   */
		/* Styles */
		appearance: none;
		position: relative;
		border: 0;
		font: inherit;
		width: 100%;
		overflow: hidden;
		margin: calc($button-border-width * -1);
		padding: $button-border-width;
		color: var(--button-color-text);
		border-radius: $button-radius;
		transform: none;
		user-select: none;
		will-change: transform;
		background-color: $button-color-border;
		/**
   * This one's optional, it just stops the button from jumping around when the
   * content width changes
   */
		min-width: 8rem;

		&:hover {
			filter: brightness(0.95);
		}
		&:active {
			transform: scale(0.99);
		}

		@media (prefers-reduced-motion: no-preference) {
			transition: $button-transition;
			transition-property: color, filter, transform;
		}

		&.is-busy {
			--button-color-text: $button-color-text-busy;
			--button-disco-animation-state: running;
			--button-disco-opacity-enabled: $button-disco-opacity;
			cursor: progress;
		}
	}

	.content {
		box-sizing: border-box;
		display: inline-flex;
		position: relative;
		border-radius: calc($button-radius - $button-border-width);
		background-color: $button-color-bg;
		width: 100%;
		justify-content: center;
		padding: 8px 16px;
		text-align: center;
		z-index: 10;
	}

	.disco,
	.disco::before {
		position: absolute;
		width: 100%;
	}

	.disco {
		inset: 0;
		height: 100%;
		top: 50%;
		transform: translateY(-50%) scaleX(calc($button-aspect-ratio * $button-aspect-ratio-multiplier));
		will-change: transform;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			min-height: 100%;
			top: 50%;
			aspect-ratio: 1/1;
			transform-origin: center;
			background-image: conic-gradient($button-disco-gradient-stops);
			opacity: var(--button-disco-opacity-enabled, 0);
			/**
   * This one's not strictly necessary, but I think it helps soften the gradient
   * and reduces animation "easing".
   */
			filter: blur(8px);

			@media (prefers-reduced-motion: reduce) {
				transform: translateY(-50%) rotate(0deg);
			}

			@media (prefers-reduced-motion: no-preference) {
				animation: $button-disco-animation;
				animation-play-state: var(--button-disco-animation-state, paused);
				transition: $button-transition;
				transition-property: opacity;
			}
		}
	}
</style>
