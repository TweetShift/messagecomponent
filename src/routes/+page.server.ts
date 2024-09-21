import type { PageServerLoad } from './$types';
import { construct } from '$lib/construct';
import { Buffer } from 'node:buffer';

export const load: PageServerLoad = ({ url }) => {
	// Get the message from the url
	const encodedMessage = url.searchParams.get('message');

	if (!encodedMessage) {
		return {
			message: 'No message provided'
		};
	}

	// Decode the message from base64
	const message = JSON.parse(Buffer.from(encodedMessage, 'base64').toString('utf-8'));

	return {
		message: construct(message)
	};
};
