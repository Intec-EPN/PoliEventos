import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://backend:5000', // Proxy para conectar con el backend
    },
  },
  plugins: [react()],
})
