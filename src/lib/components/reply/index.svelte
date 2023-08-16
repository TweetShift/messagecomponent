<script lang="ts">
	import AttachmentReply from '$lib/svgs/attachment-reply.svg?component';
	import CommandReply from '$lib/svgs/command-reply.svg?component';
	import ReplyIcon from '$lib/svgs/reply-icon.svg?component';
	import VerifiedTick from '$lib/svgs/verified-tick.svg?component';
	import './reply.css';

	/**
	 * The message author's username.
	 * @default 'User'
	 */
	export let author = 'User';

	/**
	 * The message author's avatar. Can be a relative path or external link.
	 */
	export let avatar: string;

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
	 * Whether the author is the original poster.
	 */
	export let op = false;

	/**
	 * Whether the bot is verified or not.
	 * Only works if `bot` is `true`
	 */
	export let verified = false;

	/**
	 * Whether the message has been edited or not.
	 */
	export let edited = false;

	/**
	 * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	export let roleColor: string;

	/**
	 * Whether the referenced message is from a response of a slash command.
	 */
	export let command = false;

	/**
	 * Whether the referenced message contains attachments.
	 */
	export let attachment = false;

	/**
	 * Whether this reply pings the original message sender, prepending an "@" on the author's username.
	 */
	export let mentions = false;

	/**
	 * Whether to use compact mode or not.
	 */
	export let compactMode = false;
</script>

<div class="discord-replied-message">
	{#if compactMode}
		<div class="discord-reply-badge">
			<ReplyIcon />
		</div>
	{:else}
		<img class="discord-replied-message-avatar" src={avatar} alt={author} />
	{/if}
	{#if bot && !server}
		<span class="discord-application-tag">
			{#if verified}
				<VerifiedTick />
			{/if}
			Bot
		</span>
	{/if}
	{#if server && !bot}
		<span class="discord-application-tag">Server</span>
	{/if}
	{#if op}
		<span class="discord-application-tag discord-application-tag-op">OP</span>
	{/if}
	<span class="discord-replied-message-username" style:color={roleColor ?? ''}>
		{#if mentions}@{/if}{author}
	</span>
	<div class="discord-replied-message-content">
		<slot />
		{#if edited}
			<span class="discord-message-edited">(edited)</span>
		{/if}
	</div>
	{#if command}
		<CommandReply class="discord-replied-message-content-icon" />
	{:else if attachment}
		<AttachmentReply class="discord-replied-message-content-icon" />
	{/if}
</div>
