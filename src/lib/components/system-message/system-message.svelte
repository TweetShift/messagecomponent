<script lang="ts">
	import { type DiscordTimestamp, handleTimestamp } from '$lib/utils/util';
	import Boost from '$lib/svgs/boost.svg?component';
	import DMCall from '$lib/svgs/dm-call.svg?component';
	import DMEdit from '$lib/svgs/dm-edit.svg?component';
	import DMMissedCall from '$lib/svgs/dm-missed-call.svg?component';
	import Pin from '$lib/svgs/pin.svg?component';
	import SystemAlert from '$lib/svgs/system-alert.svg?component';
	import SystemError from '$lib/svgs/system-error.svg?component';
	import Thread from '$lib/svgs/thread.svg?component';
	import UserJoin from '$lib/svgs/user-join.svg?component';
	import UserLeave from '$lib/svgs/user-leave.svg?component';
	import { onMount } from 'svelte';
	import './system-message.css';

	/**
	 * The timestamp to use for the message date.
	 */
	export let timestamp: DiscordTimestamp = new Date();

	/**
	 * The type of system message this is, this will change the icon shown.
	 * Valid values: `join`, `leave`, `call`, `missed-call`, `boost`, `edit`, `thread`, `pin`, `alert`, and `error`.
	 */
	export let type:
		| 'join'
		| 'leave'
		| 'call'
		| 'missed-call'
		| 'boost'
		| 'edit'
		| 'thread'
		| 'pin'
		| 'alert'
		| 'error' = 'join';

	/**
	 * Whether this message is to show channel name changes, used to match Discord's style.
	 */
	export let channelName = false;

	/**
	 * Whether this message has a thread attached to it.
	 */
	export let hasThread = false;

	$: timestamp = handleTimestamp(timestamp);

	onMount(() => {
		handleTimestamp(timestamp);
	});
</script>

<div
	class={`discord-system-message discord-${type}-system-message`}
	class:discord-system-message-has-thread={hasThread}
	class:discord-channel-name-change={channelName}>
	<div class="discord-message-icon">
		{#if type === 'join'}
			<UserJoin />
		{:else if type === 'leave'}
			<UserLeave />
		{:else if type === 'call'}
			<DMCall />
		{:else if type === 'missed-call'}
			<DMMissedCall />
		{:else if type === 'edit'}
			<DMEdit />
		{:else if type === 'boost'}
			<Boost />
		{:else if type === 'thread'}
			<Thread />
		{:else if type === 'alert'}
			<SystemAlert />
		{:else if type === 'error'}
			<SystemError />
		{:else if type === 'pin'}
			<Pin />
		{/if}
	</div>
	<div class="discord-message-content">
		<span>
			<slot />
			<span class="discord-message-timestamp">{timestamp}</span>
		</span>
		<slot name="reactions" />
		<slot name="thread" />
	</div>
</div>
