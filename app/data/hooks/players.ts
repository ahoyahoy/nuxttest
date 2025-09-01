import {useQueryClient} from '@tanstack/vue-query'

import type {GetPlayerParams} from '~/data/api/players'
import type {ApiResult} from '~/data/utils/api-helpers'

import {playersApi} from '~/data/api/players'
import {keysFactory} from '~/data/utils/keys-factory'
import {everyMin, getCachedData, createQuery, createMutation} from '~/data/utils/query-utils'

const kf = keysFactory('players')

const listPlayersAndCharactersKey = () =>
  kf.create('list')

const itemPlayerKey = (params: GetPlayerParams) =>
  kf.create('item', params)

export function usePlayersAndCharactersQuery({enabled = true} = {}) {
  const queryKey = listPlayersAndCharactersKey()
  const queryClient = useQueryClient()

  const query = createQuery(
    queryKey,
    () => playersApi.list(),
    {
      enabled,
      ...everyMin(5),
      ...getCachedData(queryKey),
    },
  )

  watch(query.data, (players) => {
    if (!players) {
      return
    }
    players.forEach((playerData) => {
      if (!playerData.player) {
        return
      }
      const playerQueryKey = itemPlayerKey({id: playerData.player.id})
      queryClient.setQueryData(playerQueryKey, playerData)
    })
  })

  return query
}

export function usePlayerQuery(params: GetPlayerParams) {
  const queryKey = itemPlayerKey(params)

  return createQuery(
    queryKey,
    () => playersApi.item(params),
    {
      ...everyMin(15),
      ...getCachedData(queryKey),
    },
  )
}

export function usePlayerCreateMutation() {
  const queryClient = useQueryClient()

  return createMutation(playersApi.create, {
    onSuccess: (data) => {
      if (data.id) {
        queryClient.setQueryData(itemPlayerKey({id: data.id}), {player: data})
      }
    },
    onSettled: () => {
      const queryKey = listPlayersAndCharactersKey()
      queryClient.invalidateQueries({queryKey})
    },
  })
}

export function usePlayerUpdateMutation() {
  const queryClient = useQueryClient()

  return createMutation(playersApi.update, {
    onSuccess: (data, variables) => {
      const id = data.id ?? variables.id
      if (id) {
        queryClient.setQueryData(itemPlayerKey({id}), {player: data})
      }
    },
    onSettled: () => {
      const queryKey = listPlayersAndCharactersKey()
      queryClient.invalidateQueries({queryKey})
    },
  })
}

export function usePlayerDeleteMutation() {
  const queryClient = useQueryClient()
  const listKey = listPlayersAndCharactersKey()

  return createMutation(playersApi.delete, {
    onMutate: async (variables) => {
      await queryClient.cancelQueries({queryKey: listKey})
      const prev = queryClient.getQueryData<ApiResult<typeof playersApi.list>>(listKey)

      if (prev) {
        queryClient.setQueryData(listKey, prev.filter(p => p.player?.id !== variables.id))
      }

      const itemKey = itemPlayerKey({id: variables.id})
      queryClient.removeQueries({queryKey: itemKey, exact: true})

      return {prev}
    },
    onError: (_err, _vars, ctx) => {
      if (ctx && typeof ctx === 'object' && 'prev' in ctx && ctx.prev) {
        queryClient.setQueryData(listKey, ctx.prev)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: listKey})
    },
  })
}
