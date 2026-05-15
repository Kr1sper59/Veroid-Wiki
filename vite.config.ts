import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'gh-pages-spa-fallback',
      closeBundle() {
        const index = resolve(__dirname, 'dist/index.html')
        copyFileSync(index, resolve(__dirname, 'dist/404.html'))
      },
    },
  ],
})
