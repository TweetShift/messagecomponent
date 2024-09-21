import { rules, htmlTag, toHTML, markdownEngine } from '@odiffey/discord-markdown';
import type { KebabCase } from 'type-fest';
import type { SingleASTNode } from '@khanacademy/simple-markdown';
import '@skyra/discord-components-core';

type CustomTagProps = Parameters<typeof htmlTag>;

type CustomTagAttributes<K extends keyof HTMLElementTagNameMap> = Partial<{
	[Key in keyof HTMLElementTagNameMap[K]]: HTMLElementTagNameMap[K][Key];
}>;

// this is the function that outputs the html nodes
const customTag = <
	K extends keyof HTMLElementTagNameMap,
	K2 extends keyof CustomTagAttributes<K>,
	V2 extends CustomTagAttributes<K>[K2],
	K3 extends K2 extends string ? KebabCase<K2> : never
>(
	tagName: K,
	content: CustomTagProps[1],
	attributes?: Partial<Record<K3, V2>> | null | undefined,
	isClosed?: CustomTagProps[3],
	state?: CustomTagProps[4]
) => {
	return htmlTag(tagName, content, attributes as CustomTagProps[2], isClosed, state);
};

// discord-components-core uses webcomponents which we do want
// so we need to replace the html output for each rule with the matching webcomponent tag and props from discord-components-core

// discord-components-core populates the HTMLElementTagNameMap with the webcomponent tags
// we need a function that wraps htmlTag and autocompletes the tag name and props for each tag from discord-components-core

export const messageRules: typeof rules = {
	// Escape rule
	escape: {
		...rules.escape,
		html: (node, output, state) => customTag('span', node.content, null, true, state)
	},

	// Text rule
	text: {
		...rules.text,
		html: (node, output, state) => customTag('span', node.content, null, true, state)
	},

	// Emphasis rule
	em: {
		...rules.em,
		html: (node, output, state) =>
			customTag('discord-italic', output(node.content, state), null, true, state)
	},

	// Strong emphasis rule
	strong: {
		...rules.strong,
		html: (node, output, state) =>
			customTag('discord-bold', output(node.content, state), null, true, state)
	},

	// Underline rule
	u: {
		...rules.u,
		html: (node, output, state) =>
			customTag('discord-underlined', output(node.content, state), null, true, state)
	},

	// Strikethrough rule
	strike: {
		...rules.strike,
		html: (node, output, state) => customTag('s', output(node.content, state), null, true, state)
	},

	// Inline code rule
	inlineCode: {
		...rules.inlineCode,
		html: (node, output, state) => customTag('discord-code', node.content, null, true, state)
	},

	// Code block rule
	codeBlock: {
		...rules.codeBlock,
		html: (node, output, state) =>
			customTag('discord-code', node.content, { multiline: true }, true, state)
	},

	// Blockquote rule
	blockQuote: {
		...rules.blockQuote,
		html: (node, output, state) =>
			customTag('discord-quote', output(node.content, state), null, true, state)
	},

	// Link rule
	link: {
		...rules.link,
		html: (node, output, state) =>
			customTag('discord-link', output(node.content, state), { href: node.target }, true, state)
	},

	// Autolink rule
	autolink: {
		...rules.autolink,
		html: (node, output, state) =>
			customTag('discord-link', node.content[0].content, { href: node.target }, true, state)
	},

	// Url rule
	url: {
		...rules.url,
		html: (node, output, state) =>
			customTag('discord-link', node.target, { href: node.target }, true, state)
	},

	// Emoticon rule
	emoticon: {
		...rules.emoticon
	},

	// Emoji rule
	discordEmoji: {
		...rules.discordEmoji,
		html: (node, output, state) =>
			customTag('discord-custom-emoji', '', { name: node.name, url: node.url }, false, state)
	},

	// User mention rule
	discordUser: {
		...rules.discordUser,
		html: (node, output, state) =>
			customTag('discord-mention', state.discordCallback.user(node), { type: 'user' }, true, state)
	},

	// Channel mention rule
	discordChannel: {
		...rules.discordChannel,
		html: (node, output, state) =>
			customTag(
				'discord-mention',
				state.discordCallback.channel(node),
				{ type: 'channel' },
				true,
				state
			)
	},

	// Role mention rule
	discordRole: {
		...rules.discordRole,
		html: (node, output, state) =>
			customTag('discord-mention', state.discordCallback.role(node), { type: 'role' }, true, state)
	},

	// Everyone mention rule
	discordEveryone: {
		...rules.discordEveryone,
		html: (node, output, state) =>
			customTag(
				'discord-mention',
				state.discordCallback.everyone(node),
				{ type: 'role' },
				true,
				state
			)
	},

	// Here mention rule
	discordHere: {
		...rules.discordHere,
		html: (node, output, state) =>
			customTag('discord-mention', state.discordCallback.here(node), { type: 'role' }, true, state)
	},

	// Timestamp rule
	discordTimestamp: {
		...rules.discordTimestamp,
		html: (node, output, state) =>
			customTag('discord-time', state.discordCallback.timestamp(node), null, true, state)
	},

	// Slash command rule
	discordSlash: {
		...rules.discordSlash,
		html: (node, output, state) =>
			customTag(
				'discord-mention',
				state.discordCallback.slash(node),
				{ type: 'slash' },
				true,
				state
			)
	},

	// Spoiler rule
	spoiler: {
		...rules.spoiler,
		html: (node, output, state) =>
			customTag('discord-spoiler', output(node.content, state), null, true, state)
	},

	// Footnote rule
	footnote: {
		...rules.footnote,
		html: (node, output, state) =>
			customTag('discord-subscript', output(node.content, state), null, true, state)
	},

	// List rule
	list: {
		...rules.list,
		html: (node, output, state) => {
			const tagName = node.ordered ? 'discord-ordered-list' : 'discord-unordered-list';

			const itemsContent = node.items
				.map((item: SingleASTNode | SingleASTNode[]) => {
					const itemContent = output(item, state);
					return customTag('discord-list-item', itemContent, null, true, state);
				})
				.join('');

			return customTag(tagName, itemsContent, null, true, state);
		}
	},

	// Heading rule
	heading: {
		...rules.heading,
		html: (node, output, state) => {
			const level = Math.min(node.level, 3);
			return customTag(
				'discord-header',
				output(node.content, state),
				{ level: level as 1 | 2 | 3 },
				true,
				state
			);
		}
	},

	// Linebreak rule
	br: rules.br,

	// Newline rule
	newline: rules.newline
};

const parser = markdownEngine.parserFor(messageRules);
const output = markdownEngine.outputFor(messageRules, 'html');

type HtmlOptions = {
	embed: boolean;
	escapeHTML: boolean;
	discordOnly: boolean;
	discordCallback: Record<string, (node: unknown) => string>;
};

const parseMarkdown = (source: string, options?: Partial<HtmlOptions>) => {
	return toHTML(source, options, parser, output);
};

export { parser, output, customTag, parseMarkdown };
