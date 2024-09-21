<script lang="ts">
	import '@skyra/discord-components-core';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<link rel="stylesheet" href="/fonts?id={Math.random()}" />
</svelte:head>

{#if data.message}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html data.message}
{/if}

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}
</style>
