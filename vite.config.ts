import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Builds plain static files (into /build) that GitHub Pages can serve.
			adapter: adapter(),

			// GitHub Pages serves the site from /recipe-book/, so the deploy workflow sets BASE_PATH.
			// Locally it stays empty, so `npm run dev` still works at http://localhost:5173/.
			paths: {
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`
			}
		})
	]
});
