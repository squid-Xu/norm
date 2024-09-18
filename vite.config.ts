import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 引入path模块
import path from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue'],
			dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts'), // 指定自动导入组件TS类型声明文件路径,
			resolvers: [ElementPlusResolver()],
		}),
	],
	//路径别名
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
