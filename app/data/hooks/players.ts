import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { keysFactory } from '~/data/utils/keys-factory'
import { everyMin, getCachedData, useCreateQuery } from '~/data/utils/query-options'
import { playersApi } from '~/data/api/players'
import type { GetPlayerParams, CreatePlayerParams, UpdatePlayerParams, DeletePlayerParams } from '~/data/api/players'

const kf = keysFactory('players')

const listPlayersAndCharactersKey = () => 
  kf.create('list')

const itemPlayerKey = (params: GetPlayerParams) => 
  kf.create('item', params)

export function usePlayersAndCharactersQuery({enabled = true} = {}) {
  const queryKey = listPlayersAndCharactersKey()
  const queryClient = useQueryClient()

  return useCreateQuery(
    queryKey,
    () => playersApi
      .list()
      .then((players) => {
        players.forEach((playerData) => {
          if (!playerData.player) return
          const playerQueryKey = itemPlayerKey({ id: playerData.player.id })
          queryClient.setQueryData(playerQueryKey, playerData)
        })

        return players
      }),
    {
      enabled,
      ...everyMin(5),
      ...getCachedData(queryKey),
    }
  )
}

export function usePlayerQuery(params: GetPlayerParams) {
  const queryKey = itemPlayerKey(params)

  return useCreateQuery(
    queryKey,
    () => playersApi.item(params),
    {
      ...everyMin(15),
      ...getCachedData(queryKey),
    }
  )
}

export function usePlayerCreateMutation() {
  const queryClient = useQueryClient()

  return useMutation<Awaited<ReturnType<typeof playersApi.create>>, Error, CreatePlayerParams>({
    mutationFn: (params: CreatePlayerParams) => playersApi.create(params),
    onSettled: () => {
      const queryKey = listPlayersAndCharactersKey()
      queryClient.refetchQueries({ queryKey })
    },
  })
}

export function usePlayerUpdateMutation() {
  const queryClient = useQueryClient()

  return useMutation<Awaited<ReturnType<typeof playersApi.create>>, Error, UpdatePlayerParams>({
    mutationFn: (params: UpdatePlayerParams) => playersApi.update(params),
    onSettled: () => {
      const queryKey = listPlayersAndCharactersKey()
      queryClient.refetchQueries({ queryKey })
    },
  })
}

export function usePlayerDeleteMutation() {
  const queryClient = useQueryClient()

  return useMutation<Awaited<ReturnType<typeof playersApi.delete>>, Error, DeletePlayerParams>({
    mutationFn: (params: DeletePlayerParams) => playersApi.delete(params),
    onMutate: (variables) => {
      const queryKey = listPlayersAndCharactersKey()
      queryClient.setQueryData(queryKey, (old: Awaited<ReturnType<typeof playersApi.list>>) => {
        return [
            ...old.filter(player => player.player?.id !== variables.id),
        ]
    })
    },
  })
}