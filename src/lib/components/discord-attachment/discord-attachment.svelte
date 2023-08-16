<script lang="ts">
	// import { validateImageExtension } from '../../util';
	/**
	 * The URL for the image attachment
	 * @important Should be a valid image URL, i.e. matching the regex `/\.(bmp|jpe?g|png|gif|webp|tiff)$/i`
	 */
	export let url: string;

	/**
	 * The height of the image in pixels
	 */
	export let height: number;

	/**
	 * The width of the image in pixels
	 */
	export let width: number;

	/**
	 * The alt text to show in case the image was unable to load
	 * @default 'discord attachment'
	 */
	export let alt = 'discord attachment';

	// public componentWillRender() {
	// 	validateImageExtension(url);
	// }
</script>

<div class="discord-attachment">
	<div class="discord-image-wrapper" style={`height: ${height}px; width: ${width}px`}>
		<img {alt} src={url} {height} {width} />
	</div>
</div>
