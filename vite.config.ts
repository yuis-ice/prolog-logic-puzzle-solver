import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/prolog-logic-puzzle-solver/',
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['tau-prolog'],
    force: true
  },
  server: {
    fs: {
      strict: false
    }
  }
})
