// sourced from https://github.com/merlinfuchs/embed-generator/blob/main/embedg-app/src/discord/schema.ts

import { z } from 'zod';

export function getUniqueId(): number {
	return Math.floor(Math.random() * 1000000000);
}

const VARIABLE_RE = new RegExp('{{[^}]+}}');

const HOSTNAME_RE = new RegExp('.[a-zA-Z]{2,}$');
const urlRefinement: [(v: string) => boolean, string] = [
	(v) => {
		if (v === '') return true;
		if (VARIABLE_RE.test(v)) return true;

		try {
			const url = new URL(v);
			return !!url.hostname.match(HOSTNAME_RE);
		} catch {
			return false;
		}
	},
	'Invalid URL'
];

// const IMAGE_PATH_RE = new RegExp('\\.(png|jpg|jpeg|webp|gif)$')
const imageUrlRefinement: [(v: string) => boolean, string] = [
	(v) => {
		if (v === '') return true;
		if (VARIABLE_RE.test(v)) return true;

		try {
			const url = new URL(v);
			return !!url.hostname.match(HOSTNAME_RE); // && !!url.pathname.match(IMAGE_PATH_RE) TODO: make better image url regex
		} catch {
			return false;
		}
	},
	'Invalid image URL'
];

export const uniqueIdSchema = z.number().optional();

export type UniqueId = z.infer<typeof uniqueIdSchema>;

export const embedFooterTextSchema = z.optional(z.string().max(2048));

export type EmbedFooterText = z.infer<typeof embedFooterTextSchema>;

export const embedFooterIconUrlSchema = z.optional(z.string().refine(...imageUrlRefinement));

export type EmbedFooterIconUrl = z.infer<typeof embedFooterIconUrlSchema>;

export const embedFooterSchema = z.optional(
	z.object({
		text: embedFooterTextSchema,
		icon_url: embedFooterIconUrlSchema
	})
);

export type EmbedFooter = z.infer<typeof embedFooterSchema>;

export const embedImageUrlSchema = z.optional(z.string().refine(...urlRefinement));

export type EmbedImageUrl = z.infer<typeof embedImageUrlSchema>;

export const embedImageSchema = z.optional(
	z.object({
		url: embedImageUrlSchema
	})
);

export type EmbedImage = z.infer<typeof embedImageSchema>;

export const embedThumbnailUrlSchema = z.optional(z.string().refine(...urlRefinement));

export type EmbedThumbnailUrl = z.infer<typeof embedThumbnailUrlSchema>;

export const embedThumbnailSchema = z.optional(
	z.object({
		url: embedThumbnailUrlSchema
	})
);

export type EmbedThumbnail = z.infer<typeof embedThumbnailSchema>;

export const embedAuthorNameSchema = z.string().min(1).max(256);

export type EmbedAuthorName = z.infer<typeof embedAuthorNameSchema>;

export const embedAuthorUrlSchema = z.optional(z.string().refine(...urlRefinement));

export type EmbedAuthorUrl = z.infer<typeof embedAuthorUrlSchema>;

export const embedAuthorIconUrlSchema = z.optional(z.string().refine(...imageUrlRefinement));

export type EmbedAuthorIconUrl = z.infer<typeof embedAuthorIconUrlSchema>;

export const embedAuthorSchema = z.optional(
	z.object({
		name: embedAuthorNameSchema,
		url: embedAuthorUrlSchema,
		icon_url: embedAuthorIconUrlSchema
	})
);

export type EmbedAuthor = z.infer<typeof embedAuthorSchema>;

export const embedProviderNameSchema = z.string().min(1).max(256);

export type EmbedProviderName = z.infer<typeof embedProviderNameSchema>;

export const embedProviderUrlSchema = z.optional(z.string().refine(...urlRefinement));

export type EmbedProviderUrl = z.infer<typeof embedProviderUrlSchema>;

export const embedProviderSchema = z.optional(
	z.object({
		name: embedProviderNameSchema,
		url: embedProviderUrlSchema
	})
);

export type EmbedProvider = z.infer<typeof embedProviderSchema>;

export const embedFieldNameSchema = z.string().min(1).max(256);

export type EmbedFieldName = z.infer<typeof embedFieldNameSchema>;

export const embedFieldValueSchema = z.string().min(1).max(1024);

export type EmbedFieldValue = z.infer<typeof embedFieldValueSchema>;

export const embedFieldInlineSchma = z.optional(z.boolean());

export type EmbedFieldInline = z.infer<typeof embedFieldInlineSchma>;

export const embedFieldSchema = z.object({
	id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
	name: embedFieldNameSchema,
	value: embedFieldValueSchema,
	inline: embedFieldInlineSchma
});

export type EmbedField = z.infer<typeof embedFieldSchema>;

export const embedTitleSchema = z.optional(z.string().max(256));

export type EmbedTitle = z.infer<typeof embedTitleSchema>;

export const embedDescriptionSchema = z.optional(z.string().max(4096));

export type EmbedDescription = z.infer<typeof embedDescriptionSchema>;

export const embedUrlSchema = z.optional(z.string().refine(...urlRefinement));

export type EmbedUrl = z.infer<typeof embedUrlSchema>;

export const embedTimestampSchema = z.optional(z.string());

export type EmbedTimestamp = z.infer<typeof embedTimestampSchema>;

export const embedColor = z.optional(z.number().max(16777215));

export type EmbedColor = z.infer<typeof embedColor>;

export const embedSchema = z
	.object({
		id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
		title: embedTitleSchema,
		description: embedDescriptionSchema,
		url: embedUrlSchema,
		timestamp: embedTimestampSchema,
		color: embedColor,
		footer: embedFooterSchema,
		author: embedAuthorSchema,
		provider: embedProviderSchema,
		image: embedImageSchema,
		thumbnail: embedThumbnailSchema,
		fields: z.optional(z.array(embedFieldSchema).max(25).default([]))
	})
	.superRefine((data, ctx) => {
		if (
			!data.description &&
			!data.title &&
			!data.author &&
			!data.provider &&
			!data.footer &&
			!data.fields?.length &&
			!data.image &&
			!data.thumbnail
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['description'],
				message: 'Description is required when no other fields are set'
			});
		}
	});

export type MessageEmbed = z.infer<typeof embedSchema>;

export const emojiSchema = z
	.object({
		id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
		name: z.string(),
		animated: z.boolean()
	})
	.refine((val) => val.id || val.name, 'Emoji must have either an id or a name');

export type Emoji = z.infer<typeof emojiSchema>;

export const buttonStyleSchema = z
	.literal(1)
	.or(z.literal(2))
	.or(z.literal(3))
	.or(z.literal(4))
	.or(z.literal(5));

export type MessageComponentButtonStyle = z.infer<typeof buttonStyleSchema>;

export const buttonSchema = z
	.object({
		id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
		type: z.literal(2),
		style: z.literal(1).or(z.literal(2)).or(z.literal(3)).or(z.literal(4)),
		label: z.string(),
		emoji: z.optional(z.nullable(emojiSchema)),
		disabled: z.optional(z.boolean()),
		action_set_id: z.optional(z.string().default(() => getUniqueId().toString()))
	})
	.or(
		z.object({
			id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
			type: z.literal(2),
			style: z.literal(5),
			label: z.string(),
			emoji: z.optional(z.nullable(emojiSchema)),
			url: z.string().refine(...urlRefinement),
			disabled: z.optional(z.boolean()),
			action_set_id: z.optional(z.string().default(() => getUniqueId().toString()))
		})
	)
	.superRefine((data, ctx) => {
		if (!data.emoji && !data.label) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['label'],
				message: 'Label is required when no emoji is set'
			});
		}
	});

export type MessageComponentButton = z.infer<typeof buttonSchema>;

export const selectMenuOptionSchema = z.object({
	id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
	label: z.string().min(1).max(100),
	description: z.optional(z.string().min(1).max(100)),
	emoji: z.optional(z.nullable(emojiSchema)),
	action_set_id: z.optional(z.string().default(() => getUniqueId().toString()))
});

export type MessageComponentSelectMenuOption = z.infer<typeof selectMenuOptionSchema>;

export const selectMenuSchema = z.object({
	id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
	type: z.literal(3),
	placeholder: z.optional(z.string().max(150)),
	disabled: z.optional(z.boolean()),
	options: z.array(selectMenuOptionSchema).min(1).max(25)
});

export type MessageComponentSelectMenu = z.infer<typeof selectMenuSchema>;

export const actionRowSchema = z.object({
	id: z.optional(uniqueIdSchema.default(() => getUniqueId())),
	type: z.literal(1),
	components: z.array(buttonSchema.or(selectMenuSchema)).min(1).max(5)
});

export type MessageComponentActionRow = z.infer<typeof actionRowSchema>;

export const messageContentSchema = z.string().max(2000);

export type MessageContent = z.infer<typeof messageContentSchema>;

export const webhookUsernameSchema = z.optional(
	z
		.string()
		.max(80)
		.refine(
			(val) => !val.toLowerCase().includes('clyde') && !val.toLowerCase().includes('discord'),
			"Username can't contain 'clyde' or 'discord'"
		)
		.refine(
			(val) => val.toLowerCase() !== 'everyone' && val.toLowerCase() !== 'here',
			"Username can't be 'everyone' or 'here'"
		)
);

// Define Snowflake schema (string of digits)
export const snowflakeSchema = z.string().regex(/^\d+$/);

// Define User schema
export const userSchema = z.object({
	id: snowflakeSchema,
	username: z.string(),
	discriminator: z.string(),
	avatar: z.string().nullable(),
	bot: z.boolean().optional(),
	system: z.boolean().optional(),
	mfa_enabled: z.boolean().optional(),
	banner: z.string().nullable().optional(),
	accent_color: z.number().nullable().optional(),
	locale: z.string().optional(),
	verified: z.boolean().optional(),
	email: z.string().nullable().optional(),
	flags: z.number().optional(),
	premium_type: z.number().optional(),
	public_flags: z.number().optional()
});

// Define Channel Mention schema
export const channelMentionSchema = z.object({
	id: snowflakeSchema,
	guild_id: snowflakeSchema,
	type: z.number(),
	name: z.string()
});

// Define Attachment schema
export const attachmentSchema = z.object({
	id: snowflakeSchema,
	filename: z.string(),
	content_type: z.string().optional(),
	size: z.number(),
	url: z.string(),
	proxy_url: z.string(),
	height: z.number().nullable().optional(),
	width: z.number().nullable().optional(),
	ephemeral: z.boolean().optional()
});

// Define Reaction schema
export const reactionSchema = z.object({
	count: z.number(),
	me: z.boolean(),
	emoji: emojiSchema
});

// Define Message Activity schema
export const messageActivitySchema = z.object({
	type: z.number(),
	party_id: z.string().optional()
});

// Define Partial Application schema
export const partialApplicationSchema = z.object({
	id: snowflakeSchema
	// Add other fields as necessary
});

// Define Message Reference schema
export const messageReferenceSchema = z.object({
	message_id: snowflakeSchema.optional(),
	channel_id: snowflakeSchema.optional(),
	guild_id: snowflakeSchema.optional(),
	fail_if_not_exists: z.boolean().optional()
});

// Define Message Interaction Metadata schema
export const messageInteractionMetadataSchema = z.object({
	id: snowflakeSchema,
	type: z.number(),
	name: z.string(),
	user: userSchema
	// member field is omitted as it's more complex
});

// Define Channel schema (simplified)
export const channelSchema = z.object({
	id: snowflakeSchema,
	type: z.number()
	// Add other fields as necessary
});

// Define Message Role Subscription Data schema
export const messageRoleSubscriptionDataSchema = z.object({
	role_subscription_listing_id: snowflakeSchema,
	tier_name: z.string(),
	total_months_subscribed: z.number(),
	is_renewal: z.boolean()
});

// Define Interaction Data Resolved schema (simplified)
export const interactionDataResolvedSchema = z.object({
	// Define fields as needed
});

// Define Poll schema
export const pollSchema = z.object({
	// Define fields as needed
});

// Define Message Snapshot schema
export const messageSnapshotSchema = z.object({
	// Define fields as needed
});

// Define Message Call schema
export const messageCallSchema = z.object({
	// Define fields as needed
});

export type WebhookUsername = z.infer<typeof webhookUsernameSchema>;

export const webhookAvatarUrlSchema = z.optional(z.string().refine(...imageUrlRefinement));

export type WebhookAvatarUrl = z.infer<typeof webhookAvatarUrlSchema>;

export const messageTtsSchema = z.boolean();

export type MessageTts = z.infer<typeof messageTtsSchema>;

export const messageAllowedMentionsSchema = z.optional(
	z.object({
		parse: z.array(z.literal('users').or(z.literal('roles')).or(z.literal('everyone'))),
		roles: z.array(z.string()),
		users: z.array(z.string()),
		replied_user: z.boolean()
	})
);

export const messageThreadName = z.optional(z.string().max(100));

export const baseMessageSchema = z.object({
	// Existing properties
	content: messageContentSchema.default(''),
	username: webhookUsernameSchema.default(''),
	avatar_url: webhookAvatarUrlSchema.default(''),
	embeds: z.optional(z.array(embedSchema).max(10)).default([]),
	allowed_mentions: messageAllowedMentionsSchema
		.default({
			parse: ['users', 'roles', 'everyone'],
			roles: [],
			users: [],
			replied_user: false
		})
		.optional(),
	components: z.array(actionRowSchema).max(5).default([]).optional(),

	// New properties from APIMessage
	id: snowflakeSchema.optional(),
	channel_id: snowflakeSchema.optional(),
	author: userSchema.optional(),
	timestamp: z.string().optional(),
	edited_timestamp: z.string().nullable().optional(),
	tts: z.boolean().optional(),
	mention_everyone: z.boolean().optional(),
	mentions: z.array(userSchema).optional(),
	mention_roles: z.array(snowflakeSchema).optional(),
	mention_channels: z.array(channelMentionSchema).optional(),
	attachments: z.array(attachmentSchema).optional(),
	reactions: z.array(reactionSchema).optional(),
	nonce: z.union([z.number(), z.string()]).optional(),
	pinned: z.boolean().optional(),
	webhook_id: snowflakeSchema.optional(),
	type: z.number().optional(),
	activity: messageActivitySchema.optional(),
	application: partialApplicationSchema.optional(),
	application_id: snowflakeSchema.optional(),
	message_reference: messageReferenceSchema.optional(),
	flags: z.number().optional(),
	interaction_metadata: messageInteractionMetadataSchema.optional(),
	thread: channelSchema.optional(),
	position: z.number().optional(),
	role_subscription_data: messageRoleSubscriptionDataSchema.optional(),
	resolved: interactionDataResolvedSchema.optional(),
	poll: pollSchema.optional(),
	message_snapshots: z.array(messageSnapshotSchema).optional(),
	call: messageCallSchema.optional()
});

export const messageSchema = baseMessageSchema
	.extend({
		referenced_message: z
			.lazy(() => baseMessageSchema)
			.nullable()
			.optional()
	})
	.default({
		content: '',
		username: '',
		avatar_url: '',
		embeds: [],
		allowed_mentions: {
			parse: ['users', 'roles', 'everyone'],
			roles: [],
			users: [],
			replied_user: false
		},
		components: []
	});

export type Message = z.infer<typeof messageSchema>;
