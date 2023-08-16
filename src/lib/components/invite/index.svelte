<script lang="ts">
	import { defaultDiscordAvatars } from '$lib/options/options';
	import GuildBadge from '$lib/svgs/guild-badge.svg?component';
	import PartnerBadgeOverlay from '$lib/svgs/partner-badge-overlay.svg?component';
	import VerifiedBadgeOverlay from '$lib/svgs/verified-badge-overlay.svg?component';
	import './invite.css';

	/**
	 * The server icon to display for the invite.
	 */
	export let icon = defaultDiscordAvatars.blue;

	/**
	 * The server's name.
	 * @default 'Discord Server'
	 */
	export let name = 'Discord Server';

	/**
	 * The URL to open when you click on the join button.
	 */
	export let url: string;

	/**
	 * The number of members online on the server.
	 * @default 0
	 */
	export let online = 0;

	/**
	 * The number of members on the server.
	 * @default 0
	 */
	export let members = 0;

	/**
	 * Whether the server is verified.
	 * Only works if `partnered` is `false` or `undefined`.
	 */
	export let verified = false;

	/**
	 * Whether the server is partnered.
	 * Only works if `verified` is `false` or `undefined`.
	 */
	export let partnered = false;

	/**
	 * Invitation embed title.
	 * @default "You've been invited to join a server"
	 */
	export let inviteTitle = "You've been invited to join a server";

	/**
	 * The join button.
	 * @default 'Join'
	 */
	export let joinBtn = 'Join';
</script>

<div class="discord-invite">
	<div class="discord-invite-header">{inviteTitle}</div>
	<div class="discord-invite-root">
		<img class="discord-invite-icon" src={icon} alt={name} />
		<div class="discord-invite-info">
			<div class="discord-invite-title">
				{#if (verified && !partnered) || (!verified && partnered)}
					<div class="discord-invite-badge">
						<GuildBadge
							aria-label={partnered ? 'Discord Partner' : 'Verified'}
							class={`discord-invite-badge-${partnered ? 'partnered' : 'verified'}`} />
						<div class="discord-invite-badge-container">
							{#if partnered}
								<PartnerBadgeOverlay />
							{:else}
								<VerifiedBadgeOverlay />
							{/if}
						</div>
					</div>
				{/if}
				<span class="discord-invite-name">{name}</span>
			</div>
			<div class="discord-invite-counts">
				<i class="discord-invite-status discord-invite-status-online" />
				<span class="discord-invite-count">{online.toLocaleString()} Online</span>
				<i class="discord-invite-status" />
				<span class="discord-invite-count">{members.toLocaleString()} Members</span>
			</div>
		</div>
		<a class="discord-invite-join" href={url} target="_blank" rel="noopener noreferrer">
			{joinBtn}
		</a>
	</div>
</div>
