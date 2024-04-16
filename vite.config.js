import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://newbackend-production-4bfc.up.railway.app',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
