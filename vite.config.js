import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
	plugins: [vue()],
	configureWebpack: {
		devServer: {
			historyApiFallback: true,
		},
	},
	css: { preprocessorOptions: { scss: { charset: false } } },
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
