import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/**'],
      manifest: {
        name: 'Portafolio · Desarrollador Full Stack',
        short_name: 'Portafolio',
        description: 'Portafolio profesional de [Tu Nombre]',
        theme_color: '#08080c',
        background_color: '#08080c',
        display: 'standalone',
        icons: [
          {
            src: 'images/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'images/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
