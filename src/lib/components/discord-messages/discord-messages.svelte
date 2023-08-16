<script lang="ts">
	/**
	 * Whether to use light theme or not.
	 */
	export let lightTheme: boolean;

	/**
	 * Whether to exclude the background or not.
	 */
	export let noBackground: boolean;

	/**
	 * Whether to use compact mode or not.
	 */
	export let compactMode: boolean;
</script>

<div
	class="discord-messages"
	class:discord-light-theme={lightTheme}
	class:discord-compact-mode={compactMode}
	class:discord-no-background={noBackground}>
	<slot />
</div>
