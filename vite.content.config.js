import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production') // 👈 THIS FIXES IT
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/content/content.jsx'),
      name: 'ContentScript',
      fileName: () => 'content.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'content.js',
      },
    },
  },
})
