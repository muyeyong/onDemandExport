import { fileURLToPath, URL } from 'node:url'
import { globSync } from 'glob'
import path from 'node:path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    dts({
      entryRoot: './component',
      outputDir: ['./hope/h/type', './hope/lib/type']
      //指定使用的tsconfig.json为我们整个项目根目录下，如果不配置，你也可以在components下新建tsconfig.json
    }),
    {
      ...Components({
        dirs: ['components/**'],
        extensions: ['vue'],
        deep: true,
        dts: 'types/components.d.ts',
        directoryAsNamespace: false,
        globalNamespaces: [],
        directives: true,
        importPathTransform: (v) => v,
        allowOverrides: false,
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        resolvers: [AntDesignVueResolver()]
      }),
      apply: 'build'
    },
    {
      name: 'style',
      generateBundle(config, bundle) {
        // 这里可以这里可以获取打包后的文件目录以及代码code
        const keys = Object.keys(bundle)
        for (const key of keys) {
          const bundler: any = bundle[key as any]
          //rollup内置方法，将所有输出文件code中的.less换成.css，因为我们当时没有打包less文件
          this.emitFile({
            type: 'asset',
            fileName: key, //文件名不变，
            source: bundler.code.replace(/\.less/g, '.css')
          })
        }
      }
    }
  ],
  build: {
    minify: false,
    outDir: './hope',
    lib: {
      entry: './component/index.ts',
    },
    rollupOptions: {
      external: ['cheerio', 'vue', 'vue-router'],
      input: Object.fromEntries(globSync(['component/**/*.ts', 'component/*.ts']).map(file => [
        path.relative(
          'component',
          file.slice(0, file.length - path.extname(file).length)
        ),
        fileURLToPath(new URL(file, import.meta.url))
      ])),
      output: [
        {
          // 打包格式
          format: 'es',
          // 打包后文件名
          entryFileNames: '[name].mjs',
          // 让打包目录和我们的组件库目录对应
          // preserveModules: true,
          exports: 'named',
          // 配置打包根目录
          dir: './hope/h/lib'
        },
        {
          // 打包格式
          format: 'cjs',
          // 打包后文件名
          entryFileNames: '[name].js',
          // 让打包目录和我们的组件库目录对应
          // preserveModules: true,
          exports: 'named',
          // 配置打包根目录
          dir: './hope/lib/lib'
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./component', import.meta.url))
    }
  }
})
