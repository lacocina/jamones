import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [vue(), vueJsx()],
        resolve: {
      alias: {
        '@components': path.resolve('./src/components'),
        '@composables': path.resolve('./src/composables'),
        '@assets': path.resolve('./src/assets'),
        '@css': path.resolve('./src/css')
      }
    },
    css: {
      modules: {
        generateScopedName: mode === 'development' ? '[name]-[local]--[hash:base64:4]' : '[hash:base64:4]',
        localsConvention: 'camelCaseOnly',
      },
      devSourcemap: mode === 'development'
    },
  }
})
