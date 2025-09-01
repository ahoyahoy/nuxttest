import {ApiService} from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

import {extractApiProperty} from '@/data/utils/api-helpers.js'

/**
 * Získání seznamu všech herních tříd
 * Vrací přímo classes array, error se propaguje do TanStack Query
 */
export async function listClasses() {
  const {callRpc} = useRpc()

  return extractApiProperty(
    callRpc(ApiService.method.listClasses, {}),
    'classes',
  )
}

// Export API object ve stylu tvého projektu
export const classesApi = {
  list: listClasses,
}
