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

import { VantResolver } from '@vant/auto-import-resolver';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],
            // eslint 报错解决
            eslintrc: {
                enabled: false // 是否自动生成 eslint 规则，建议生成之后设置 false，避免重复生成消耗
            },
            dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'), // 指定自动导入函数TS类型声明文件路径
            resolvers: [
                // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                ElementPlusResolver(),
                // 自动导入vant
                VantResolver()
            ]
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
                    enabledCollections: ['ep']
                }),
                // 自动注册vant
                VantResolver()
            ]
        }),
        // Icons图标自动下载
        Icons({
            autoInstall: true
        }),
        //用于生成 svg 雪碧图.
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]'
        })
    ],
    //路径别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
});
