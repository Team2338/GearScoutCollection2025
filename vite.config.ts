import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
	base: '',
	plugins: [
		react(),
		VitePWA({
			injectRegister: null, // Manually register the service worker
			manifest: false,
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'service-worker.ts',
			includeAssets: ['manifest.json', 'logos/*.{png,ico,svg,jpg,gif,webp}']
		})
	],
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
