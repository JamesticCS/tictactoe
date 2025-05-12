import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tictactoe/', // Add this for GitHub Pages deployment
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
});