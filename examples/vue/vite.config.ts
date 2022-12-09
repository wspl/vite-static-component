import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import staticComponent from 'vite-static-component'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), staticComponent({
    entry: 'src/static-entry.ts',
    selector: '#static',
  })],
})
