import { defineConfig } from 'vite'

export default defineConfig({
  // No base needed for Vercel — it serves from root
  base: '/',
  build: {
    outDir: 'dist',
  },
})
