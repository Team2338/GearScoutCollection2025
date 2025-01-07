import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	base: '',
	plugins: [react()],
	server: {
		open: true,
		port: 3000,
		host: 'localhost'
	},
	build: {
		outDir: 'build',
		rollupOptions: {
			input: {
				app: './index.html',
				'service-worker': './src/service-worker.ts',
			},
			output: {
				entryFileNames: (asset) => {
					if (asset.name === 'service-worker') {
						return '[name].js'
					}

					return 'assets/js/[name]-[hash].js'
				}
			}
		}
	}
});
