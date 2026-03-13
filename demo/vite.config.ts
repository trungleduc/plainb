import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      plainb: path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    fs: { allow: ['..'] },
  },
})
