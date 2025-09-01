import {
    type DescMessage,
    type DescMethodUnary,
    type MessageInitShape,
    type MessageShape,
  } from "@bufbuild/protobuf";
  import { create } from "@bufbuild/protobuf";
  import { ConnectError } from "@connectrpc/connect";
  
  export function useRpc() {
    const transport = useNuxtApp().$rpcTransport;
  
    const callRpc = async <I extends DescMessage, O extends DescMessage>(
      schema: DescMethodUnary<I, O>,
      originalInput: MessageInitShape<I> | undefined,
      opts?: { headers?: HeadersInit }
    ): Promise<MessageShape<O>> => {
      // Create input object, it can be modificated here
      let input: MessageShape<I> = create(schema.input, originalInput);
  
      // Call RPC method and handle error
      try {
        const rpcResult = await transport.unary(
          schema,
          undefined,
          undefined,
          opts?.headers || {},
          input,
          undefined
        );
        return rpcResult.message;
      } catch (e) {
        // Example, here you can process error details
        throw e;
      }
    };
  
    return {
      callRpc,
    };
  }