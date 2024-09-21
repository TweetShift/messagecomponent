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

// @font-face{font-family:ABC Ginto Nord;font-style:normal;font-weight:800;src:url(/assets/3d07f5abf272fbb5670d02ed687453d0.woff2) format("woff2")}@font-face{font-family:ABC Ginto Nord;font-style:italic;font-weight:800;src:url(/assets/3c0aa7f9d47d6a96b14ecada461ccf0e.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:normal;font-weight:400;src:url(/assets/3d6549bf2f38372c054eafb93fa358a9.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:italic;font-weight:400;src:url(/assets/281bba49537cf936d1a0df10fb719f63.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:normal;font-weight:500;src:url(/assets/7f63813838e283aea62f1a68ef1732c2.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:italic;font-weight:500;src:url(/assets/17bf6b1c912399ef0f05742315932aae.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:normal;font-weight:600;src:url(/assets/71d3e9dc2bcb8e91225ba9fab588c8f2.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:italic;font-weight:600;src:url(/assets/a6f145c7d25de52895579fad8b45265b.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:normal;font-weight:700;src:url(/assets/ff5eccde83f118cea0224ebbb9dc3179.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:italic;font-weight:700;src:url(/assets/d295c40af6fca08f8e0eb5425351f431.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:normal;font-weight:800;src:url(/assets/f5aba5511523dcae97748a1b35bbffe8.woff2) format("woff2")}@font-face{font-family:gg sans;font-style:italic;font-weight:800;src:url(/assets/1ac46f07e44e1d6020a4b6b19e34c844.woff2) format("woff2")}@font-face{font-family:gg mono;font-style:normal;font-weight:400;src:url(/assets/12d1fdcd37780f8db6504f926a11b2cc.woff2) format("woff2")}@font-face{font-family:gg mono;font-style:normal;font-weight:700;src:url(/assets/1a18189c2a3c610379e5cdb77ffb044b.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:normal;font-weight:400;src:url(/assets/980082c4328266be3342a03dcb37c432.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:italic;font-weight:400;src:url(/assets/db985aaa3c64f10506d96d876e350d47.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:normal;font-weight:500;src:url(/assets/05422eb499ddf5616e44a52c4f1063ae.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:italic;font-weight:500;src:url(/assets/412f5d9534ce2a2e1a1ae9b746bca5b5.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:normal;font-weight:600;src:url(/assets/e55012627a8f6e7203b72a8de730c483.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:italic;font-weight:600;src:url(/assets/d9b0aabb79e7d8b3b14789ebd534f158.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:normal;font-weight:700;src:url(/assets/7cf1be7696bf689b97230262eade8ad8.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:italic;font-weight:700;src:url(/assets/f9bf0f65660d23c6f359d22720fc55ae.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:normal;font-weight:800;src:url(/assets/d6db7b5639c7ed70f8b582984dda6c62.woff2) format("woff2")}@font-face{font-family:Noto Sans;font-style:italic;font-weight:800;src:url(/assets/a2a248f78d12dd5b842930bda7036302.woff2) format("woff2")}@font-face{font-family:Source Code Pro;font-style:normal;font-weight:400;src:url(/assets/b5ebc919bdce2ce021544cd67c86632a.woff2) format("woff2")}@font-face{font-family:Source Code Pro;font-style:normal;font-weight:700;src:url(/assets/67184d051f9979f01ea1e8466d4d2cda.woff2) format("woff2")}@font-face{font-family:Corinthia;font-style:normal;font-weight:400;src:url(/assets/297a3c6b5d3bb052f335e3b2ec7a7b26.woff2) format("woff2")}@font-face{font-family:Fraunces;font-style:normal;font-weight:300 800;src:url(/assets/d7fc5bc613a01b40855b93930b933723.woff2) format("woff2")}

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
