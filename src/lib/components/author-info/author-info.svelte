<script lang="ts">
	import VerifiedTick from '$lib/svgs/verified-tick.svg?component';
	import './author-info.css';
	/**
	 * The name of the author
	 */
	export let author: string;
	/**
	 * Whether this author is a bot. Only works if `server` is `false` or `undefined`.
	 */
	export let bot: boolean;
	/**
	 * Whether this author is a `server` crosspost webhook. Only works if `bot` is `false` or `undefined`.
	 */
	export let server: boolean;
	/**
	 * Whether this author is the original poster.
	 */
	export let op: boolean;
	/**
	 * The colour of the author, which comes from their highest role
	 */
	export let roleColor: string;
	/**
	 * The role icon of the author, which comes from their highest role
	 */
	export let roleIcon: string;
	/**
	 * The role name of the author, which comes from their highest role
	 */
	export let roleName: string;
	/**
	 * Whether this bot is verified by Discord. Only works if `bot` is `true`
	 */
	export let verified: boolean;
	/**
	 * Whether to reverse the order of the author info for compact mode.
	 */
	export let compact: boolean;
</script>

<span class="discord-author-info">
	{#if !compact}
		<span class="discord-author-username" style:color={roleColor}>
			{author}
		</span>
		{#if roleIcon}
			<img
				class="discord-author-role-icon"
				src={roleIcon}
				height="20"
				width="20"
				alt={roleName}
				draggable={false} />
		{/if}
		<!-- If bot is true then we need to render a Bot tag -->
		{#if bot && !server}
			<span class="discord-application-tag">
				<!-- If verified is true then a verified checkmark should be prefixed -->
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
	{:else}
		<span class="discord-author-username" style:color={roleColor}>
			{author}
		</span>
	{/if}
</span>
