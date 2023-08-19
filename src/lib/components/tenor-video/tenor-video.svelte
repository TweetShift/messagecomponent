<script lang="ts">
	import './tenor-video.css';
	/**
	 * The URL for the video
	 */
	export let url: string;

	/**
	 * The height of the video in pixels
	 */
	export let height: number;

	/**
	 * The width of the video in pixels
	 */
	export let width: number;
</script>

<div class="discord-tenor-video">
	<div class="discord-tenor-video-wrapper" style:height={`${height}px`} style:width={`${width}px`}>
		<video muted preload="auto" autoplay loop src={url} {height} {width} />
	</div>
</div>
