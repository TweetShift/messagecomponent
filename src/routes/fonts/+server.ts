import type { RequestHandler } from './$types';

async function getDiscordFonts() {
	const response = await fetch(
		'https://web.scraper.workers.dev/?url=https%3A%2F%2Fdiscord.com%2Fdevelopers%2Fdocs%2Fintro&selector=link%5Brel%3Dstylesheet%5D&scrape=attr&attr=href&pretty=true'
	);
	const { result } = (await response.json()) as { result: string[] };
	if (result.length) {
		const cssResponse = await fetch(`https://discord.com${result}`);
		const css = await cssResponse.text();
		return getFontFaceDeclarations(css);
	} else {
		console.log('No result found');
	}
}

function getFontFaceDeclarations(css: string) {
	const fontFaceDeclarationRegex = /@font-face{.*?}/g;
	const fontFaceDeclarations = css.match(fontFaceDeclarationRegex);

	return fontFaceDeclarations?.join('').replace(/src:url\((.*?)\)/gm, 'src: url("/fonts$1")') ?? '';
}

export const GET: RequestHandler = async () => {
	const fonts = await getDiscordFonts();
	return new Response(fonts, {
		headers: {
			'Content-Type': 'text/css'
		}
	});
};
