import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: '/vk-pet-app',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src', 'components'),
    },
  },
})
