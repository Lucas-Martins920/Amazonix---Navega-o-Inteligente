import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Amazonix - Navegação Inteligente',
        short_name: 'Amazonix',
        description: 'GPS para navegação segura em rios da Amazônia',
        theme_color: '#059669', // Verde esmeralda (mesmo do seu cabeçalho)
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Cache de Tiles (Mapa)
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 dias de cache
              },
              cacheableResponse: { 
                statuses: [0, 200] 
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    fs: {
      // Impede erros ao escanear a pasta 'android' do Capacitor
      allow: ['..']
    }
  }
})