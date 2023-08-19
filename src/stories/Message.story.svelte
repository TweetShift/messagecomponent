<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import Messages from '$lib/components/messages/messages.svelte';
	import Message from '$lib/components/message/message.svelte';
	export let Hst: Histoire;
</script>

<Hst.Story>
	<Messages lightTheme>
		<Message>Hello world!</Message>
	</Messages>
</Hst.Story>
