import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'@payload-config': path.resolve(__dirname, '../cms/src/payload.config.ts'),
			'@payload-types': path.resolve(__dirname, '../cms/src/payload-types.ts'),
			'$lib': path.resolve(__dirname, './src/lib'),
			'$components': path.resolve(__dirname, './src/components')
		}
	}
};

export default config;
