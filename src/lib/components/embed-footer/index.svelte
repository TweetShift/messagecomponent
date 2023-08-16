<script lang="ts">
	import { type DiscordTimestamp, handleTimestamp } from '$lib/utils/util';
	import './embed-footer.css';
	/**
	 * The image to use next to the footer text.
	 */
	export let footerImage: string;

	/**
	 * The timestamp to use for the message date. When supplying a string, the format must be `01/31/2000`.
	 */
	export let timestamp: DiscordTimestamp;

	$: timestamp = updateTimestamp(timestamp);

	function updateTimestamp(value?: DiscordTimestamp): string | null {
		if (!value || isNaN(new Date(value).getTime())) return null;
		return handleTimestamp(new Date(value));
	}
</script>

<div class="discord-embed-footer">
	{#if footerImage}
		<img src={footerImage} alt="" class="discord-footer-image" />
	{/if}
	<slot />
	{#if timestamp}
		<span class="discord-footer-separator">&bull;</span>
		{timestamp}
	{/if}
</div>
