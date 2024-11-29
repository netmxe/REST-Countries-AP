import adapter from '@sveltejs/adapter-vercel';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(), // Utilisez l'adaptateur Vercel
		alias: {
			$components: path.resolve('./src/components') // Alias pour src/components
		},
		prerender: {
			entries: ['*'] // Prérendre toutes les pages si nécessaire
		}
	}
};

export default config;
