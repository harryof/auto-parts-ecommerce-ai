import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // AI Agent — должен быть ВЫШЕ общего /api/ (как в nginx.conf)
      '/api/chat': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      // Backend API
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
