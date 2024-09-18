import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// 引入path模块
import path from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
//  ElementPlus的Icon自动导入
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
			imports: ['vue'],
			dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
			resolvers: [
				// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
				ElementPlusResolver(),
			],
		}),
		Components({
			dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts'), // 指定自动导入组件TS类型声明文件路径,
			resolvers: [
				ElementPlusResolver(),
				// 自动注册图标组件
				IconsResolver({
					// 修改Icon组件前缀，prefix不设置则默认为i,禁用则设置为false
					// prefix: 'i',
					// 指定collection，即指定为elementplus图标集ep
					enabledCollections: ['ep'],
				}),
			],
		}),
		// Icons图标自动下载
		Icons({
			autoInstall: true,
		}),
	],
	//路径别名
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
