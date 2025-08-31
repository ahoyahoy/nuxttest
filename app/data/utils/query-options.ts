import { useQuery, useQueryClient } from '@tanstack/vue-query'

export const everyMin = (minutes: number) => ({
  staleTime: 1000 * 60 * minutes,
  gcTime: 1000 * 60 * minutes * 2,
})

export const getCachedData = (queryKey: readonly unknown[]) => {
  const queryClient = useQueryClient()
  const cachedData = queryClient.getQueryData(queryKey)
  
  return {
    initialData: cachedData,
    initialDataUpdatedAt: cachedData ? Date.now() : undefined,
  }
}

export const useCreateQuery = <TQueryFn extends () => Promise<any>>(
  queryKey: readonly unknown[],
  queryFn: TQueryFn,
  options: any = {}
) => {
  const query = useQuery<Awaited<ReturnType<TQueryFn>>>({
    queryKey,
    queryFn,
    retry: 2,
    refetchOnWindowFocus: false,
    ...options,
  })

  // Přidání suspense funkce pro SSR podporu
  const suspense = async () => {
    const queryClient = useQueryClient()
    await queryClient.prefetchQuery({
      queryKey,
      queryFn,
      ...options,
    })
  }

  return {
    ...query,
    suspense,
  }
}
