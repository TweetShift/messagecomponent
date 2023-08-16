export interface Avatars {
	default: 'blue' | 'gray' | 'green' | 'orange' | 'red';
	blue?: string;
	gray?: string;
	green?: string;
	orange?: string;
	red?: string;
	[key: string]: string | undefined;
}

export interface Profile {
	author?: string;
	avatar?: string;
	bot?: boolean;
	verified?: boolean;
	server?: boolean;
	op?: boolean;
	roleColor?: string;
	roleIcon?: string;
	roleName?: string;
}

export interface DiscordMessageOptions {
	avatars?: Avatars;
	profiles?: { [key: string]: Profile };
	emojis?: { [key: string]: Emoji };
	defaultTheme?: string;
	defaultMode?: string;
	defaultBackground?: 'discord' | 'none';
}

export type NonNullableFields<T> = {
	[P in keyof T]: NonNullable<T[P]>;
};

export const defaultDiscordAvatars: NonNullableFields<Omit<Avatars, 'default'>> = {
	blue: 'https://cdn.discordapp.com/embed/avatars/0.png',
	gray: 'https://cdn.discordapp.com/embed/avatars/1.png',
	green: 'https://cdn.discordapp.com/embed/avatars/2.png',
	orange: 'https://cdn.discordapp.com/embed/avatars/3.png',
	red: 'https://cdn.discordapp.com/embed/avatars/4.png',
	pink: 'https://cdn.discordapp.com/embed/avatars/5.png'
};

export interface Emoji {
	name?: string;
	url?: string;
	embedEmoji?: boolean;
}
