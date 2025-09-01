import {useMutation, useQuery, useQueryClient, type UseMutationOptions} from '@tanstack/vue-query'

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

export const createQuery = <TQueryFn extends () => Promise<any>>(
  queryKey: readonly unknown[],
  queryFn: TQueryFn,
  options: any = {},
) => {
  const query = useQuery<Awaited<ReturnType<TQueryFn>>>({
    queryKey,
    queryFn,
    retry: 2,
    refetchOnWindowFocus: false,
    ...options,
  })

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

export const createMutation = <TParams, TData>(
  apiFn: (params: TParams) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, Error, TParams>, 'mutationFn'>,
) => {
  return useMutation<TData, Error, TParams>({
    mutationFn: apiFn,
    ...options,
  })
}
