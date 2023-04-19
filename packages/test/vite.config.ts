import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
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
      lib: {
        entry: 'src/main.ts',
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
