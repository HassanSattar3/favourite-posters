import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/favourite-posters/',
  publicDir: 'public',
  build: {
    copyPublicDir: true,
    assetsDir: 'assets'
  }
})
