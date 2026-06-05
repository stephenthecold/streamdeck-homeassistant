import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import path from 'path'
import RestartStreamDeck from './src/vite/RestartStreamDeck.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteYaml(),
    RestartStreamDeck()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap still relies on legacy Sass APIs; suppress its third-party
        // deprecation noise so our own build output stays readable.
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions']
      }
    }
  },
  build: {
    outDir: 'de.perdoctus.streamdeck.homeassistant.sdPlugin',
    rollupOptions: {
      input: {
        pi: 'pi.html',
        plugin: 'plugin.html'
      }
    }
  },
  base: './'
})
