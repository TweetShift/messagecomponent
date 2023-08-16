<script lang="ts">
	import CommandIcon from '$lib/svgs/command-icon.svg?component';

	/**
	 * Discord's compact mode. This is set to `true` when the user has compact mode enabled in their settings.
	 */
	export let compactMode = false;

	/**
	 * The message author's username.
	 * @default 'User'
	 */
	export let author = 'User';

	/**
	 * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
	 */
	export let avatar: string;

	/**
	 * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	export let roleColor: string;

	/**
	 * The name of the command invoked.
	 */
	export let command: string;
</script>

<div class="discord-replied-message discord-executed-command">
	{#if compactMode}
		<div class="discord-reply-badge">
			<CommandIcon />
		</div>
	{:else}
		<img class="discord-replied-message-avatar" src={avatar} alt={author} />
	{/if}
	<span class="discord-replied-message-username" style={`color: ${roleColor}`}>
		{author}
	</span>
	used
	<div class="discord-replied-message-content discord-command-name">{command}</div>
</div>
