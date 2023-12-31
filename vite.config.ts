/// <reference types="histoire" />

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { HstSvelte } from '@histoire/plugin-svelte';
import svg from '@poppanator/sveltekit-svg';

export default defineConfig({
	plugins: [sveltekit(), svg()],
	histoire: {
		plugins: [HstSvelte()],
		theme: {
			title: 'Discord Message Component',
			logo: {
				square: './static/3.png',
				light: './static/3.png',
				dark: './static/3.png'
			}
		}
	}
});
