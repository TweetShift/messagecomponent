<script lang="ts">
	/**
	 * The field's title.
	 */
	export let fieldTitle!: string;

	/**
	 * Whether this field should be displayed inline or not.
	 */
	export let inline = false;

	/**
	 * The index of this inline field
	 * @remark This defines the position of this inline field. 1 is left, 2 is middle and 3 is right.
	 * @oneof [1, 2, 3]
	 * @default 1
	 */
	export let inlineIndex: 1 | 2 | 3 = 1;

	const validInlineIndices = new Set([1, 2, 3]);
	$: if (!validInlineIndices.has(inlineIndex)) {
		throw new RangeError('DiscordEmbedField `inlineIndex` prop must be one of: 1, 2, or 3');
	}

	// TODO: parse emojis in title
</script>

<div
	class="discord-embed-field"
	class:discord-embed-inline-field={inline}
	class:discord-embed-inline-field-1={inline && inlineIndex === 1}
	class:discord-embed-inline-field-2={inline && inlineIndex === 2}
	class:discord-embed-inline-field-3={inline && inlineIndex === 3}>
	{#if fieldTitle}
		<div class="discord-field-title">{fieldTitle}</div>
	{/if}
	<slot />
</div>
