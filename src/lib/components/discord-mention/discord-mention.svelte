<script lang="ts">
	import hexToRgba from 'hex-to-rgba';
	import ChannelForum from '$lib/svgs/channel-forum.svg?component';
	import ChannelIcon from '$lib/svgs/channel-icon.svg?component';
	import ChannelThread from '$lib/svgs/channel-thread.svg?component';
	import LockedVoiceChannel from '$lib/svgs/locked-voice-channel.svg?component';
	import VoiceChannel from '$lib/svgs/voice-channel.svg?component';
	import { onDestroy, onMount } from 'svelte';

	let el: HTMLDivElement;

	/**
	 * The color to use for this mention. Only works for role mentions and must be in hex format.
	 */
	export let color: string;

	/**
	 * The type of mention this should be. This will prepend the proper prefix character.
	 * Valid values: `user`, `channel`, `role`, `voice`, `locked`, `thread`, `forum`, and `slash`.
	 */
	export let type: 'user' | 'channel' | 'role' | 'voice' | 'locked' | 'thread' | 'forum' | 'slash' =
		'user';

	const setHoverColor = () => (el.style.backgroundColor = hexToRgba(color, 0.3));
	const resetHoverColor = () => (el.style.backgroundColor = hexToRgba(color, 0.1));

	onMount(() => {
		if (color && type === 'role') {
			el.addEventListener('mouseover', () => setHoverColor());
			el.addEventListener('mouseout', () => resetHoverColor());
		}
	});

	onDestroy(() => {
		if (color && type === 'role') {
			el.removeEventListener('mouseover', () => setHoverColor());
			el.removeEventListener('mouseout', () => resetHoverColor());
		}
	});
</script>

<div
	style={!color || type !== 'role'
		? ''
		: `color: ${color}; background-color: ${hexToRgba(color, 0.1)}`}
	class={`discord-mention discord-${type}-mention`}
	bind:this={el}>
	{#if type === 'channel'}
		<ChannelIcon class="discord-mention-icon" />
	{:else if type === 'user' || type === 'role'}
		@
	{:else if type === 'voice'}
		<VoiceChannel class="discord-mention-icon" />
	{:else if type === 'locked'}
		<LockedVoiceChannel class="discord-mention-icon" />
	{:else if type === 'thread'}
		<ChannelThread class="discord-mention-icon" />
	{:else if type === 'forum'}
		<ChannelForum class="discord-mention-icon" />
	{:else if type === 'slash'}
		/
	{/if}
	<slot />
</div>
