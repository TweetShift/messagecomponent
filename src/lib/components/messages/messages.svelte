<script lang="ts">
	import './messages.css';
	/**
	 * Whether to use light theme or not.
	 */
	export let lightTheme = false;

	/**
	 * Whether to exclude the background or not.
	 */
	export let noBackground = false;

	/**
	 * Whether to use compact mode or not.
	 */
	export let compactMode = false;
</script>

<div
	class="discord-messages"
	class:discord-light-theme={lightTheme}
	class:discord-compact-mode={compactMode}
	class:discord-no-background={noBackground}>
	<slot />
</div>
