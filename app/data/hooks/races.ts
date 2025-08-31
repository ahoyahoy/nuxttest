import { useQueryClient } from '@tanstack/vue-query'
import { keysFactory } from '~/data/utils/keys-factory'
import { everyMin, getCachedData, useCreateQuery } from '~/data/utils/query-options'
import { racesApi } from '~/data/api/races'

const kf = keysFactory('races')

const listRacesKey = () => 
  kf.create('list')

export function useRacesQuery({enabled = true} = {}) {
  const queryKey = listRacesKey()
  const queryClient = useQueryClient()

  return useCreateQuery(
    queryKey,
    () => racesApi.list(),
    {
      enabled,
      ...everyMin(5),
      ...getCachedData(queryKey),
    }
  )
}

export function useRaceQuery(params: {id: string}) {
  const query = useRacesQuery()
  
  const retData = computed(() => {
    if (!query.data.value || !params.id) return null
    return query.data.value.find(race => race.id === params.id) || null
  })

  return {
    ...query,
    data: retData,
  }
}
