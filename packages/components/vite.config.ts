import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'
import path, { join } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import dts from 'vite-plugin-dts'

const resolve = (dir: string) => path.join(__dirname, '../', dir);

function upperCastedLine(str: string) {
  let temp = str.replace(/[A-Z]/g, function (match) {
    return "-" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === '-') {
    temp = temp.slice(1);
  }
  return temp;
}

function getComponentEntries(path: string) {
  const absolutePath = resolve(path)
  const files = fs.readdirSync(absolutePath);
  const componentEntries = files.reduce((fileObj: any, item) => {
    //  文件路径
    const itemPath = join(absolutePath, item);
    //  在文件夹中
    const isDir = fs.statSync(itemPath).isDirectory();
    const [name, suffix] = item.split('.');
  
    //  文件中的入口文件
    if (isDir) {
      fileObj[upperCastedLine(item)] = resolve(join(itemPath, 'index.ts'))
    }
    //  文件夹外的入口文件
    else if (suffix === "js") {
      fileObj[name] = resolve(`${itemPath}`);
    }
    return fileObj
  }, {});
  
  return componentEntries;
}

// console.log('233', getComponentEntries('components/src/component'))

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    dts({
      entryRoot: './src',
      outputDir: ['./hope/h/src', './hope/lib/src'],
      //指定使用的tsconfig.json为我们整个项目根目录下，如果不配置，你也可以在components下新建tsconfig.json
    }),
    {
      ...Components({
        dirs: ['src/components/**'],
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
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          //rollup内置方法，将所有输出文件code中的.less换成.css，因为我们当时没有打包less文件
          this.emitFile({
            type: "asset",
            fileName: key, //文件名不变，
            source: bundler.code.replace(/\.less/g, ".css")
          })
        }
      }
    }
  ],
    build: {
      minify: false,
      outDir: 'lib',
      lib: {
        entry: './src/index.ts',
        // fileName: '[name]',
        // formats: ['es', 'cjs'],
        // name: '@XY/components'
      },
      rollupOptions: {
        external: ['cheerio', 'vue', 'vue-router'],
        input: ['src/index.ts'],
        output: [
          {
            // 打包格式
            format: 'es',
            // 打包后文件名
            entryFileNames: '[name].mjs',
            // 让打包目录和我们的组件库目录对应
            preserveModules: true,
            exports: 'named',
            // 配置打包根目录
            dir: './hope/h'
          },
          {
            // 打包格式
            format: 'cjs',
            // 打包后文件名
            entryFileNames: '[name].js',
            // 让打包目录和我们的组件库目录对应
            preserveModules: true,
            exports: 'named',
            // 配置打包根目录
            dir: './hope/lib'
          }
        ]
      }
    },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
