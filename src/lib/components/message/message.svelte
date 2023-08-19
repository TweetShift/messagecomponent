<script lang="ts">
	import './message.css';

	import { type DiscordTimestamp, handleTimestamp } from '$lib/utils/util';
	import { defaultDiscordAvatars } from '$lib/utils/options';
	import AuthorInfo from '$lib/components/author-info/author-info.svelte';
	import Ephemeral from '$lib/svgs/ephemeral.svg?component';
	import { onMount } from 'svelte';

	/**
	 * The message author's username.
	 * @default 'User'
	 */
	export let author = 'User';

	/**
	 * The message author's avatar. Can be a relative path or external link.
	 */
	export let avatar: string = defaultDiscordAvatars.blue;

	/**
	 * Whether the message author is a bot or not.
	 * Only works if `server` is `false` or `undefined`.
	 */
	export let bot = false;

	/**
	 * Whether the message author is a server crosspost webhook or not.
	 * Only works if `bot` is `false` or `undefined`.
	 */
	export let server = false;

	/**
	 * Whether the bot is verified or not.
	 * Only works if `bot` is `true`
	 */
	export let verified = false;

	/**
	 * Whether the author is the original poster.
	 */
	export let op = false;

	/**
	 * Whether the message has been edited or not.
	 */
	export let edited = false;

	/**
	 * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	export let roleColor: string | undefined = undefined;

	/**
	 * The message author's role icon URL.
	 */
	export let roleIcon: string | undefined = undefined;

	/**
	 * The name of the role to use as alternative image text.
	 */
	export let roleName: string | undefined = undefined;

	/**
	 * Whether to highlight this message.
	 */
	export let highlight = false;

	/**
	 * Whether to make this message ephemeral.
	 */
	export let ephemeral = false;

	/**
	 * The timestamp to use for the message date.
	 */
	export let timestamp: DiscordTimestamp = new Date();

	/**
	 * Whether to use 24-hour format for the timestamp.
	 */
	export let twentyFour = false;

	/**
	 * Whether to use compact mode for the timestamp.
	 */
	export let compactMode = false;

	/**
	 * Whether the message has a thread or not.
	 */
	export let hasThread = false;

	$: timestamp = handleTimestamp(timestamp, compactMode, twentyFour);

	onMount(() => {
		handleTimestamp(timestamp, compactMode, twentyFour);
	});
</script>

<div
	class="discord-message"
	class:discord-highlight-mention={highlight}
	class:discord-message-has-thread={hasThread}
	class:discord-highlight-ephemeral={ephemeral}>
	<slot name="reply" />
	<div class="discord-message-inner">
		{#if compactMode}
			<span class="discord-message-timestamp">{timestamp}</span>
		{/if}
		<div class="discord-author-avatar">
			<img src={avatar} alt={author} />
		</div>
		<div class="discord-message-content">
			{#if !compactMode}
				<AuthorInfo
					author={author ?? ''}
					bot={bot ?? false}
					server={server ?? false}
					verified={verified ?? false}
					op={op ?? false}
					roleColor={roleColor ?? ''}
					roleIcon={roleIcon ?? ''}
					roleName={roleName ?? ''}
					compact={compactMode} />
				<span class="discord-message-timestamp">{timestamp}</span>
			{/if}
			<div class="discord-message-body">
				{#if compactMode}
					<AuthorInfo
						author={author ?? ''}
						bot={bot ?? false}
						server={server ?? false}
						verified={verified ?? false}
						op={op ?? false}
						roleColor={roleColor ?? ''}
						roleIcon={roleIcon ?? ''}
						roleName={roleName ?? ''}
						compact={compactMode} />
				{/if}
				<span class="discord-message-markup">
					<slot />
				</span>
				{#if edited}
					<span class="discord-message-edited">(edited)</span>
				{/if}
			</div>
			<div class="discord-message-compact-indent">
				<slot name="embeds" />
				<slot name="attachments" />
				<slot name="components" />
				<slot name="reactions" />
				<slot name="thread" />
				{#if ephemeral}
					<div class="discord-message-ephemeral">
						<Ephemeral class="discord-message-ephemeral-icon" />
						Only you can see this •
						<span class="discord-message-ephemeral-link">Dismiss message</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
