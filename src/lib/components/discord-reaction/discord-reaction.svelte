<script lang="ts">
	/**
	 * The reaction emoji image URL.
	 */
	export let emoji: string;

	/**
	 * The name of the emoji to use as alternative image text.
	 * @default ':emoji'
	 */
	export let name = ':emoji:';

	/**
	 * The number of people who reacted.
	 * @default 1
	 */
	export let count = 1;

	/**
	 * Whether the reaction should show as reacted by the user.
	 * @default false
	 */
	export let reacted = false;

	/**
	 * Whether the reaction should be reactive.
	 * @remark When the reaction is interactive left clicking it will add 1 to the counter.
	 * Whereas when holding the Shift key and left clicking it will decrease the counter.
	 * The counter cannot go below 1.
	 * @default false
	 */
	export let interactive = false;

	function handleReactionClick(event: MouseEvent) {
		if (interactive) {
			if (event.shiftKey) {
				count--;
			} else {
				count++;
			}

			if (count <= 0) {
				count = 1;
			}
		}
	}

	function handleReactionKeyDown(event: KeyboardEvent) {
		if (interactive) {
			if (event.shiftKey) {
				count--;
			} else {
				count++;
			}

			if (count <= 0) {
				count = 1;
			}
		}
	}
</script>

<div
	class="discord-reaction"
	role="button"
	tabindex="0"
	class:discord-reaction-reacted={reacted}
	on:keydown={(e) => handleReactionKeyDown(e)}
	on:click={(e) => handleReactionClick(e)}>
	<div class="discord-reaction-inner">
		<img src={emoji} alt={name} draggable={false} />
		<span class="discord-reaction-count">{count}</span>
	</div>
</div>
