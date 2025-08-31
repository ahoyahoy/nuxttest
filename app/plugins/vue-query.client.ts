import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxtApp) => {
  // Vytvoříme QueryClient s konfigurací
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minut
        gcTime: 1000 * 60 * 10,   // 10 minut (dříve cacheTime)
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  })

  // Registrujeme VueQueryPlugin do Vue app
  nuxtApp.vueApp.use(VueQueryPlugin, {
    queryClient,
  })
})
