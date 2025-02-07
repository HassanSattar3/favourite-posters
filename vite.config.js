import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/favourite-posters/',
  build: {
    rollupOptions: {
      output: {
        // Add timestamp to chunk filenames for cache busting
        chunkFileNames: 'assets/[name]-[hash]-[timestamp].js',
        entryFileNames: 'assets/[name]-[hash]-[timestamp].js',
        assetFileNames: 'assets/[name]-[hash]-[timestamp].[ext]'
      }
    },
    // Configure headers for caching
    assetsDir: 'assets',
    modulePreload: {
      polyfill: true
    }
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
})
