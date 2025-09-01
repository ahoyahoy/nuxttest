import type {GetPlayerRequest, CreatePlayerRequest, UpdatePlayerRequest, DeletePlayerRequest} from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

import {ApiService} from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

import type {ApiParams} from '@/data/utils/api-helpers.js'

import {extractApiProperty, extractApiResponse} from '@/data/utils/api-helpers.js'

export type GetPlayerParams = ApiParams<GetPlayerRequest>
export type CreatePlayerParams = ApiParams<CreatePlayerRequest>
export type UpdatePlayerParams = ApiParams<UpdatePlayerRequest>
export type DeletePlayerParams = ApiParams<DeletePlayerRequest>

export async function listPlayersAndCharacters() {
  const {callRpc} = useRpc()

  return extractApiProperty(
    callRpc(ApiService.method.listPlayersAndCharacters, {}),
    'players',
  )
}

export async function getPlayer(params: GetPlayerParams) {
  const {callRpc} = useRpc()

  return extractApiResponse(
    callRpc(ApiService.method.getPlayer, params),
  )
}

export async function createPlayer(params: CreatePlayerParams) {
  const {callRpc} = useRpc()

  return extractApiResponse(
    callRpc(ApiService.method.createPlayer, params),
  )
}

export async function updatePlayer(params: UpdatePlayerParams) {
  const {callRpc} = useRpc()

  return extractApiResponse(
    callRpc(ApiService.method.updatePlayer, params),
  )
}

export async function deletePlayer(params: DeletePlayerParams) {
  const {callRpc} = useRpc()

  return extractApiResponse(
    callRpc(ApiService.method.deletePlayer, params),
  )
}

export const playersApi = {
  list: listPlayersAndCharacters,
  item: getPlayer,
  create: createPlayer,
  update: updatePlayer,
  delete: deletePlayer,
}
