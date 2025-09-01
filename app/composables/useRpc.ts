import type {
  DescMessage,
  DescMethodUnary,
  MessageInitShape,
  MessageShape,
} from '@bufbuild/protobuf'

import {create} from '@bufbuild/protobuf'

export function useRpc() {
  const transport = useNuxtApp().$rpcTransport

  const callRpc = async <I extends DescMessage, O extends DescMessage>(
    schema: DescMethodUnary<I, O>,
    originalInput: MessageInitShape<I> | undefined,
    opts?: {headers?: HeadersInit},
  ): Promise<MessageShape<O>> => {
    const input: MessageShape<I> = create(schema.input, originalInput)

    const rpcResult = await transport.unary(
      schema,
      undefined,
      undefined,
      opts?.headers || {},
      input,
      undefined,
    )

    return rpcResult.message
  }

  return {
    callRpc,
  }
}
