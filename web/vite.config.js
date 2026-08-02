import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [],
    },
  },
  optimizeDeps: {
    include: ['mapbox-gl'],
  },
  worker: {
    format: 'es',
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('mapbox-gl')) return 'mapbox'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/react-router')) return 'router'
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react-vendor'
        },
      },
    },
  },
})
