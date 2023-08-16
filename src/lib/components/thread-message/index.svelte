<script lang="ts">
	import { defaultDiscordAvatars } from '$lib/options/options';
	import VerifiedTick from '$lib/svgs/verified-tick.svg?component';
	import './thread-message.css';

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
	 * Whether the message has been edited or not.
	 */
	export let edited = false;

	/**
	 * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	export let roleColor: string;

	/**
	 * The relative timestamp of the message.
	 */
	export let relativeTimestamp = '1m ago';
</script>

<div class="discord-thread-message">
	<img src={avatar} class="discord-thread-message-avatar" alt={author} />
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
	<span class="discord-thread-message-username" style:color={roleColor}>
		{author}
	</span>
	<div class="discord-thread-message-content">
		<slot />
		{#if edited}
			<span class="discord-message-edited">(edited)</span>
		{/if}
	</div>
	<span class="discord-thread-message-timestamp">{relativeTimestamp}</span>
</div>
