import { keysFactory } from '~/data/utils/keys-factory'
import { everyMin, getCachedData, useCreateQuery } from '~/data/utils/query-options'
import { classesApi } from '~/data/api/classes'
import type { Class } from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

const kf = keysFactory('classes')

const listClassesKey = () => 
  kf.create('list')

export function useClassesQuery({enabled = true} = {}) {
  const queryKey = listClassesKey()

  return useCreateQuery(
    queryKey,
    () => classesApi.list(),
    {
      enabled,
      ...everyMin(5),
      ...getCachedData(queryKey),
    }
  )
}

export function useClassQuery(params: {id: string}) {
  const query = useClassesQuery()
  
  const retData = computed(() => {
    if (!query.data.value || !params.id) return null
    return query.data.value.find((cls: Class) => cls.id === params.id) || null
  })

  return {
    ...query,
    data: retData,
  }
}
