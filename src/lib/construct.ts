// We need a function that takes a message object and returns the output HTML, mimicking the Discord web client
// We need to support all the markdown features that Discord supports, including custom emojis, inline images, and more

import type { APIMessage, APIEmbedField } from 'discord-api-types/v10';
import {
	embedSchema,
	embedFieldSchema,
	messageSchema,
	type Message,
	type MessageEmbed
} from './schema';
import { customTag, parseMarkdown } from './parser';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import beautify from 'beautify';
import DOMPurify from 'isomorphic-dompurify';

const constructEmbed = (embed: MessageEmbed) => {
	const validEmbed = embedSchema.parse(embed);

	const description = customTag(
		'discord-embed-description',
		parseMarkdown(validEmbed.description || '', { embed: true }),
		{ slot: 'description' }
	);

	const fields = customTag(
		'discord-embed-fields',
		validEmbed.fields
			?.map((field: APIEmbedField) => {
				const validField = embedFieldSchema.parse(field);
				return customTag('discord-embed-field', parseMarkdown(validField.value, { embed: true }), {
					'field-title': validField.name,
					inline: validField.inline ? 'true' : undefined
				});
			})
			.join('') || '',
		{ slot: 'fields' }
	);

	return customTag('discord-embed', description + '<br />' + fields, {
		'author-name': validEmbed.author?.name,
		'author-image': validEmbed.author?.icon_url,
		'author-url': validEmbed.author?.url,
		'embed-title': validEmbed.title,
		url: validEmbed.url,
		color: validEmbed.color ? `#${validEmbed.color.toString(16).padStart(6, '0')}` : undefined,
		thumbnail: validEmbed.thumbnail?.url,
		image: validEmbed.image?.url,
		provider: validEmbed.provider
	});
};

const constructMessage = (message: Message) => {
	const contentTag = customTag('div', parseMarkdown(message.content));

	const embedsTags = message.embeds.map(constructEmbed).join('');

	const messageTag = customTag('discord-message', contentTag + embedsTags, {
		...(message.author && {
			author: message.author.username,
			avatar: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`,
			bot: message.author.bot ? 'true' : undefined,
			timestamp: message.timestamp
		})
	});

	return customTag('discord-messages', messageTag);
};

const construct = (message: APIMessage): string => {
	const validatedMessage = messageSchema.parse(message);

	const messageConstruct = constructMessage(validatedMessage);

	// Convert the construct to an HTML string
	const parser = new DOMParser();
	const doc = parser.parseFromString(messageConstruct, 'text/html');

	const serialized = new XMLSerializer().serializeToString(doc);

	const sanitized = DOMPurify.sanitize(serialized, {
		USE_PROFILES: { html: true },
		FORBID_TAGS: ['script', 'style'],
		SANITIZE_NAMED_PROPS: true,
		CUSTOM_ELEMENT_HANDLING: {
			tagNameCheck: /^discord-/, // allow all tags starting with "discord-"
			attributeNameCheck: () => true, // allow all attributes starting with "discord-"
			allowCustomizedBuiltInElements: true // customized built-ins are allowed
		}
	});

	console.log(beautify(sanitized, { format: 'html' }));

	return sanitized;
};

export { construct };
