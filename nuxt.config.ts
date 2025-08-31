import tailwindcss from '@tailwindcss/vite'
import type { NuxtPage } from '@nuxt/schema'
import { getProductConfig } from './app/config/index'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: { 
    preset: 'vercel',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', 'shadcn-nuxt', '@peterbud/nuxt-query'],
  css: ['assets/css/tailwind.css'],
  pages: true,
  ssr: true,
  
  hooks: {
    'pages:extend' (pages: NuxtPage[]) {
      pages.length = 0
      
      const productConfig = getProductConfig('dm-cz')
      
      for (const route of productConfig.routes) {
        if (typeof route.path === 'string') {
        pages.push({
          name: route.path === '/' ? 'index' : route.path.slice(1).replace('/', '-'), // Handle nested paths
            path: route.path,
            file: `~/components/pages/${route.cmp}.vue`
          })
        }
        else {
          for (const locale of productConfig.locales) {
            pages.push({
              name: route.path[locale] === '/' ? 'index' : route.path[locale].slice(1).replace('/', '-'), // Handle nested paths
              path: route.path[locale] as string,
              file: `~/components/pages/${route.cmp}.vue`
            })
          }
        }
      }
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: '~/components/ui'
  },
  nuxtQuery: {
    queryClientOptions: {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 10,
          retry: 2,
          refetchOnWindowFocus: false,
        },
      },
    },
    autoImports: false,
    devtools: true,
  },
})