import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://nonerroneously-unaddible-deanne.ngrok-free.dev',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Origin': 'http://nonerroneously-unaddible-deanne.ngrok-free.dev',
        },
      },
    },
  },
})
