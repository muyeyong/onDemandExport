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
    dts(),
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
    }],
    build: {
      minify: false,
      outDir: 'lib',
      lib: {
        entry: ['src/component/myButton/index.ts', 'src/component/myInput/index.ts'],
        fileName: '[name]',
        formats: ['es', 'cjs']
      },
      rollupOptions: {
        external: ['cheerio', 'vue', 'vue-router'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
