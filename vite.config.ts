/// <reference types="vitest" />

import { defineConfig, preview } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test.setup.ts',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8080,
  },
})
