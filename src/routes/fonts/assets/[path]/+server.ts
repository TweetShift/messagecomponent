import type { RequestHandler } from './$types';

const getFont = async (path: string) => {
	const response = await fetch(`https://discord.com/assets/${path}`);
	const buffer = await response.arrayBuffer();
	return buffer;
};

export const GET: RequestHandler = async ({ params }) => {
	const { path } = params;

	return new Response(await getFont(path), {
		headers: {
			'Content-Type': 'font/woff2'
		}
	});
};
