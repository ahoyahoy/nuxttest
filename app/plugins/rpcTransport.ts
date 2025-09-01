import {createConnectTransport} from '@connectrpc/connect-web'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()

  const transport = createConnectTransport({
    baseUrl: `https://wa-catch-hiring-api.azurewebsites.net`,
    useBinaryFormat: false,
    defaultTimeoutMs: 60000, // 60s
    interceptors: [],
    jsonOptions: {
      alwaysEmitImplicit: true,
      enumAsInteger: false,
      ignoreUnknownFields: true,
      useProtoFieldName: false,
    },
  })

  return {
    provide: {
      rpcTransport: transport,
    },
  }
})
