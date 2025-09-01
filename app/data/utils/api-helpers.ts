export async function extractApiData<TResponse, TData>(
  apiCall: Promise<TResponse>,
  dataExtractor: (response: TResponse) => TData
): Promise<TData> {
  try {
    const response = await apiCall
    return dataExtractor(response)
  } catch (error) {
    throw error
  }
}

export async function extractApiResponse<T>(apiCall: Promise<T>): Promise<T> {
  return extractApiData(apiCall, response => response)
}

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


// Protobuf message type
type Message<TypeName extends string = string> = {
  readonly $typeName: TypeName
  $unknown?: any
}

// Remove protobuf-specific properties
export type OmitMessage<T extends Message> = Omit<T, '$typeName' | '$unknown'>

// API params type - cleaner name for request params  
export type ApiParams<T extends Message> = OmitMessage<T>

// API response type
export type ApiResponse<T> = Promise<T>

// Extract return type from API function
export type ApiResult<T extends (...args: any[]) => Promise<any>> = Awaited<ReturnType<T>>
