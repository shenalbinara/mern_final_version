import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  
  plugins: [react()],
  resolve: {
    alias: {
      'tailwindcss/version.js': path.resolve(__dirname, 'src/tailwindcss/version.js'),
    },
  },
});
