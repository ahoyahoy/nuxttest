/**
 * Utility pro extrakci dat z API response s proper error handling
 * Používá se v API funkcích pro vrácení čistých dat místo response wrapperu
 * 
 * @param apiCall - Promise z callRpc
 * @param dataExtractor - funkce pro extrakci dat z response
 * @returns Přímo data nebo hází error pro TanStack Query
 * 
 * @example
 * export async function listPlayers() {
 *   return extractApiData(
 *     callRpc(ApiService.method.listPlayersAndCharacters, {}),
 *     response => response.players || []
 *   )
 * }
 */
export async function extractApiData<TResponse, TData>(
  apiCall: Promise<TResponse>,
  dataExtractor: (response: TResponse) => TData
): Promise<TData> {
  try {
    const response = await apiCall
    return dataExtractor(response)
  } catch (error) {
    // Propagujeme error pro TanStack Query error handling
    throw error
  }
}

/**
 * Helper pro jednoduchý případ kdy chceme vrátit celý response
 * 
 * @example
 * export async function getPlayer(params: GetPlayerParams) {
 *   return extractApiResponse(
 *     callRpc(ApiService.method.getPlayer, params)
 *   )
 * }
 */
export async function extractApiResponse<T>(apiCall: Promise<T>): Promise<T> {
  return extractApiData(apiCall, response => response)
}

/**
 * Helper pro případ kdy response má property s daty
 * Hází chybu pokud property neexistuje nebo je undefined/null
 * 
 * @example
 * export async function listPlayers() {
 *   return extractApiProperty(
 *     callRpc(ApiService.method.listPlayersAndCharacters, {}),
 *     'players'
 *   )
 * }
 */
export async function extractApiProperty<TResponse, K extends keyof TResponse>(
  apiCall: Promise<TResponse>,
  property: K
): Promise<NonNullable<TResponse[K]>> {
  return extractApiData(apiCall, response => {
    const value = response[property]
    if (value == null) {
      throw new Error(`API response missing expected property: ${String(property)}`)
    }
    return value as NonNullable<TResponse[K]>
  })
}


type Message<TypeName extends string = string> = {
    readonly $typeName: TypeName
    $unknown?: any
}
/**
 * Utility pro odebrání Message properties z protobuf typů
 * Užitečné pro vytváření API parametrů bez $typeName a $unknown
 * 
 * @example
 * export type GetPlayerParams = OmitMessage<GetPlayerRequest>
 */
export type OmitMessage<T extends Message> = Omit<T, '$typeName' | '$unknown'>

/**
 * Utility pro vytváření params typů z protobuf request typů
 * Alias pro OmitMessage s lepším názvem pro API params
 * 
 * @example  
 * export type GetPlayerParams = ApiParams<GetPlayerRequest>
 */
export type ApiParams<T extends Message> = OmitMessage<T>

/**
 * Helper pro typování API response funkcí
 * Užitečné pro typování API funkcí které vracejí protobuf response
 * 
 * @example
 * function getPlayer(params: ApiParams<GetPlayerRequest>): ApiResponse<GetPlayerResponse> {
 *   return callRpc(ApiService.method.getPlayer, params)
 * }
 */
export type ApiResponse<T> = Promise<T>
