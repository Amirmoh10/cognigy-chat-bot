export default function createSocketClient() {
  return {
    connect: () => Promise.resolve(),
    on: jest.fn(),
  };
}
