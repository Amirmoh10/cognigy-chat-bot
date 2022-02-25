import { screen, waitFor } from "@testing-library/react";
import App from "./App";
import { render } from "./test-utils";
jest.mock("./createSocketClient");

test("client status should be reflected properly", () => {
  render(<App />);
  const buttonElement = screen.getByTestId("submitButton");
  expect(buttonElement).toBeDefined();
  expect(buttonElement.innerHTML).toBe("Connecting...");
  return waitFor(() => expect(buttonElement.innerHTML).toBe("Send"));
});
