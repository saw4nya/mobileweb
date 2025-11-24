/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: './mobileweb/lab01_react/',
  plugins: [
    react(),
    legacy()
  ],
   build: {
    outDir: path.resolve(__dirname,"../../docs/lab01_react"),
    emptyOutDir: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
