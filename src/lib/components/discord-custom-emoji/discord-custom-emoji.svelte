<script lang="ts">
	/**
	 * The name of the emoji
	 */
	export let name: string;

	/**
	 * The emoji URL to use in the message.
	 */
	export let url: string;

	/**
	 * Determines whether or not the emoji is used in an embed, or a message.
	 * If it is used in an embed, the sizing is adjusted accordingly.
	 */
	export let embedEmoji: boolean;

	const emojiName = `:${name}:`;
	const emojiClassName = embedEmoji ? 'discord-embed-custom-emoji' : 'discord-custom-emoji';
	const emojiImageClassName = embedEmoji
		? 'discord-embed-custom-emoji-image'
		: 'discord-custom-emoji-image';
</script>

<span class={emojiClassName}>
	<img
		aria-label={emojiName}
		src={url}
		alt={emojiName}
		draggable={false}
		class={emojiImageClassName} />
</span>
