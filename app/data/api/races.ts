import { ApiService } from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'
import { extractApiProperty, extractApiResponse } from '@/data/utils/api-helpers.js'

/**
 * Získání seznamu všech herních ras
 * Vrací přímo races array, error se propaguje do TanStack Query
 */
export async function listRaces() {
  const { callRpc } = useRpc()
  return extractApiProperty(
    callRpc(ApiService.method.listRaces, {}),
    'races'
  )
}


// Export API object ve stylu tvého projektu
export const racesApi = {
  list: listRaces,
}
