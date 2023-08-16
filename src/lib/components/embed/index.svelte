<script lang="ts">
	import './embed.css';
	/**
	 * The color to use for the embed's left border. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
	 */
	export let color: string;

	/**
	 * The author's name.
	 */
	export let authorName: string;

	/**
	 * The author's avatar URL.
	 */
	export let authorImage: string;

	/**
	 * The URL to open when you click on the author's name.
	 */
	export let authorUrl: string;

	/**
	 * The embed title.
	 */
	export let embedTitle: string;

	/**
	 * The URL to open when you click on the embed title.
	 */
	export let url: string;

	/**
	 * The thumbnail image to use.
	 */
	export let thumbnail: string;

	/**
	 * The embed image to use (displayed at the bottom).
	 */
	export let image: string;

	/**
	 * The embed video to use (displayed at the bottom, same slot as the image).
	 * @important YouTube videos will not be playable on your projects, this is due to YouTube using DASH to play their videos rather
	 * than providing the raw media stream (in a container such as mp4 or ogg). Links to regular MP4 files (such as on a CDN) however
	 * will autoplay!
	 * @note Video takes priority over image.
	 * @remark Providing both a video and an image will ensure the image is shown to users with browsers
	 * that do not support HTML5 video playback.
	 * @example https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_stereo.ogg
	 */
	export let video: string;

	/**
	 * The provider to show above the embed, for example for YouTube videos it will show "YouTube" at the top of the embed (above the author)
	 * @example YouTube
	 */
	export let provider: string;

	// TODO: parse author and embed titles for emojis

	const emojiParsedAuthorName = authorName;
	const emojiParsedEmbedTitle = embedTitle;

	// const emojiParsedAuthorName = parseTitle(authorName);
	// const emojiParsedEmbedTitle = parseTitle(embedTitle);

	// private parseTitle(title?: string) {
	// 	if (!title) return null;

	// 	const words = title.split(' ');

	// 	return words.map((word: string, idx: number) => {
	// 		const emoji = getGlobalEmojiUrl(word) ?? ({} as Emoji);
	// 		let el = '';
	// 		if (emoji.name) {
	// 			el = (
	// 				<span class="discord-embed-custom-emoji">
	// 					<img src={emoji.url} alt={emoji.name} class="discord-embed-custom-emoji-image" />
	// 					<span>&nbsp;</span>
	// 				</span>
	// 			);
	// 		} else {
	// 			el = idx < words.length - 1 ? `${word} ` : word;
	// 		}
	// 		return el;
	// 	});
	// }
</script>

<div class="discord-embed">
	<div style:background-color={color} class="discord-left-border" />
	<div class="discord-embed-root">
		<div class="discord-embed-wrapper">
			<div class="discord-embed-grid">
				{#if provider}
					<div class="discord-embed-provider">{provider}</div>
				{/if}
				{#if emojiParsedAuthorName}
					<div class="discord-embed-author">
						{#if authorImage}
							<img src={authorImage} alt="" class="discord-author-image" />
						{/if}
						{#if authorUrl}
							<a href={authorUrl} target="_blank" rel="noopener noreferrer">
								{emojiParsedAuthorName}
							</a>
						{:else}
							{emojiParsedAuthorName}
						{/if}
					</div>
				{/if}
				{#if emojiParsedEmbedTitle}
					<div class="discord-embed-title">
						{#if url}
							<a href={url} target="_blank" rel="noopener noreferrer">
								{emojiParsedEmbedTitle}
							</a>
						{:else}
							{emojiParsedEmbedTitle}
						{/if}
					</div>
				{/if}

				<slot name="description" />

				<slot name="fields" />

				{#if image || video}
					<div class="discord-embed-media" class:discord-embed-media-video={Boolean(video)}>
						{#if video}
							<video
								controls
								muted
								preload="none"
								poster={image}
								src={video}
								height="225"
								width="400"
								class="discord-embed-video">
								<img src={image} alt="Discord embed media" class="discord-embed-image" />
							</video>
						{:else if image}
							<img src={image} alt="Discord embed media" class="discord-embed-image" />
						{/if}
					</div>
				{/if}

				{#if thumbnail}<img src={thumbnail} alt="" class="discord-embed-thumbnail" />{/if}
				<slot name="footer" />
			</div>
		</div>
	</div>
</div>
