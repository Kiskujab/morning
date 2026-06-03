import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Absolute base for the GitHub Pages project site at
  // https://kiskujab.github.io/morning/ — guarantees asset URLs resolve
  // correctly whether or not the request has a trailing slash.
  base: '/morning/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})
