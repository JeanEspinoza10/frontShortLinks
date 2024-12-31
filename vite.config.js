import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@utils',
        replacement: path.resolve(path.join(__dirname, '/src/utils')),
      },
      {
        find:'@components',
        replacement: path.resolve(path.join(__dirname, '/src/components')),
      },
      {
        find:'@structure',
        replacement: path.resolve(path.join(__dirname, '/src/structure')),
      }
    ],
  },
})
