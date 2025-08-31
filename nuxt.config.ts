import tailwindcss from '@tailwindcss/vite'
import type { NuxtPage } from '@nuxt/schema'
import { getProductConfig, getLocales, getDefaultLocale } from './app/config/index'

const PRODUCT_ID = 'dm-cz'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: { 
    preset: 'vercel',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'shadcn-nuxt', '@peterbud/nuxt-query', '@nuxtjs/i18n'],
  css: ['assets/css/tailwind.css'],
  pages: true,
  ssr: true,
  
  hooks: {
    'pages:extend' (pages: NuxtPage[]) {
      pages.length = 0

      pages.push({
        name: '404',
        path: '/404',
        file: '~/components/pages/404.vue'
      })
      
      const productConfig = getProductConfig(PRODUCT_ID)
      
      for (const route of productConfig.routes) {
        pages.push({
          name: route.name,
          path: typeof route.path === 'string' ? route.path : route.path[getDefaultLocale(PRODUCT_ID)],
          file: `~/components/pages/${route.cmp}.vue`
        })
      }
    },
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
  experimental: {
    scanPageMeta: true
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
  i18n: {
    locales: [
      ...getLocales(PRODUCT_ID),
    ],
    defaultLocale: getDefaultLocale(PRODUCT_ID),
    langDir: 'lang/',
    customRoutes: 'config', // disable custom route with page components
    pages: {
      'grant-thanks': {
        en: '/about-us', // -> accessible at /about-us (no prefix since it's the default locale)
        cs: '/a-propos', // -> accessible at /fr/a-propos
      }
    }
  }

})