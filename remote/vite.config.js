import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation(
      {
        name: 'remote_app',
        filename: 'remote-entry.js',
        exposes: {
          "./Button": "./src/components/Button.vue",
          "./ButtonState": "./src/composables/useCounter.ts"
        },
        shared: ['vue']        
      }
    )
  ],
  build:{
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
