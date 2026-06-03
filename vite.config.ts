import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative asset paths so the build works from a domain root, a subpath
  // (e.g. GitHub Pages /repo/), or opened directly via file://.
  base: './',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
