<script lang="ts">
	import LaunchIcon from '$lib/svgs/launch-icon.svg?component';
	import './button.css';

	/**
	 * The emoji URL to use in the button.
	 */
	export let emoji: string;

	/**
	 * The name of the emoji used in the button.
	 */
	export let emojiName = 'emoji';

	/**
	 * The URL for the button. Setting this will force the button type to be `secondary`.
	 */
	export let url: string;

	/**
	 * Whether to show the button as disabled.
	 */
	export let disabled = false;

	/**
	 * The type of button this is, this will change the color of the button.
	 * Valid values: `primary`, `secondary`, `success`, `destructive`.
	 */
	export let type: 'primary' | 'secondary' | 'success' | 'destructive' = 'secondary';

	$: {
		if (typeof type !== 'string') {
			throw new TypeError('DiscordButton `type` prop must be a string.');
		} else if (!['primary', 'secondary', 'success', 'destructive'].includes(type)) {
			throw new RangeError(
				"DiscordButton `type` prop must be one of: 'primary', 'secondary', 'success', 'destructive'"
			);
		}
	}
</script>

{#if url && !disabled}
	<a
		class="discord-button discord-button-secondary"
		href={url}
		target="_blank"
		rel="noopener noreferrer">
		{#if emoji}
			<img src={emoji} alt={emojiName} draggable={false} class="discord-button-emoji" />
			<span>
				<slot />
			</span>
			{#if url}
				<LaunchIcon class="discord-button-launch" />
			{/if}
		{/if}
	</a>
{:else}
	<div
		class={`discord-button discord-button-${type} discord-button-${
			disabled ? 'disabled' : 'hoverable'
		}`}>
		{#if emoji}
			<img src={emoji} alt={emojiName} draggable={false} class="discord-button-emoji" />
			<span>
				<slot />
			</span>
			{#if url}
				<LaunchIcon class="discord-button-launch" />
			{/if}
		{/if}
	</div>
{/if}
