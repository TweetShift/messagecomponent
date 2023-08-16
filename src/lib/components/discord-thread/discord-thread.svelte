<script lang="ts">
	/**
	 * The name of the thread.
	 */
	export let name = 'Thread';

	/**
	 * The the text within the call to action text. (i.e. 'See Thread' or 'x Messages')
	 */
	export let cta = 'See Thread';
</script>

<div class="discord-thread">
	<div class="discord-thread-top">
		<span class="discord-thread-name">{name}</span>
		<span class="discord-thread-cta" aria-hidden="true">
			{cta} ›
		</span>
	</div>
	<span class="discord-thread-bottom">
		<slot />
	</span>
</div>
