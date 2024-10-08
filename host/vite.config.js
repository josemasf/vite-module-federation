import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'app',
      remotes: {
        remoteApp: 'http://localhost:3001/assets/remote-entry.js',
      },
      shared: ['vue'],
    })
  ],
})
