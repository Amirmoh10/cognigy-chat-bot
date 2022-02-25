import { SocketClient as CognigySocketClient } from "@cognigy/socket-client";

const socketClientConfig = {
  endpoint: "https://endpoint-trial.cognigy.ai/",
  apiKey: "c62c5fbea632152a4e3265f21862b91e21eacca1f135a1a07b031a0c6f5c6274",
};

export type SocketClient = CognigySocketClient;

export default function createSocketClient(): SocketClient {
  return new CognigySocketClient(
    socketClientConfig.endpoint,
    socketClientConfig.apiKey,
    {}
  );
}
