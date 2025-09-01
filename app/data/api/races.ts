import {ApiService} from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

import {extractApiProperty} from '@/data/utils/api-helpers.js'

export async function listRaces() {
  const {callRpc} = useRpc()

  return extractApiProperty(
    callRpc(ApiService.method.listRaces, {}),
    'races',
  )
}

export const racesApi = {
  list: listRaces,
}
