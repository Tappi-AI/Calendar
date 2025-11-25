// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { projectBase } from './myconfig.js';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),

		paths: {
			base: process.env.NODE_ENV === 'production' ? projectBase : ''
		},

		// optional, but ensures SvelteKit app files stay in a predictable dir
		appDir: '_app'
	}
};

export default config;
