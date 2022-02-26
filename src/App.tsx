import React from "react";
import Alert from "@mui/material/Alert";

import * as Styles from "./App.styles";

import { useAppDispatch, useAppSelector } from "./utils";
import createSocketClient, { SocketClient } from "./createSocketClient";
import {
  currentMessageChanged,
  messageAdded,
  clientStatusChanged,
} from "./chatSlice";

type Data = {
  imgSrc?: string;
};

type Output = { text?: string; data: Data };

function App() {
  const dispatch = useAppDispatch();

  const { clientStatus, currentMessage, messages } = useAppSelector((state) => {
    return {
      clientStatus: state.chat.clientStatus,
      currentMessage: state.chat.currentMessage,
      messages: state.chat.messages,
    };
  });

  const clientRef = React.useRef<SocketClient | null>(null);

  const messageContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(
        0,
        messageContainerRef.current.scrollHeight
      );
    }
  }, [messages.length]);

  React.useEffect(() => {
    function handleOutput(output: Output) {
      dispatch(
        messageAdded({
          source: "bot",
          textContent: output.text as string,
          imgSrc: output.data.imgSrc,
        })
      );
    }

    async function setupClient() {
      clientRef.current = createSocketClient();

      clientRef.current.on("output", handleOutput);

      try {
        await clientRef.current.connect();
        dispatch(clientStatusChanged("idle"));
      } catch (e) {
        console.error(e);
        dispatch(clientStatusChanged("error"));
      }
    }

    setupClient();

    return () => {
      if (clientRef.current) {
        clientRef.current.off("output", handleOutput);
      }
    };
  }, [dispatch]);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (clientRef.current) {
      clientRef.current.sendMessage(currentMessage);
      dispatch(messageAdded({ source: "user", textContent: currentMessage }));
      dispatch(currentMessageChanged(""));
    }
  }

  return (
    <Styles.AppContainer>
      {clientStatus !== "error" ? null : (
        <Alert severity="error">
          There was an error connecting to the chat bot, please refresh the
          page.
        </Alert>
      )}
      <Styles.Content>
        <Styles.Messages ref={messageContainerRef}>
          {messages.map(({ source, textContent, imgSrc }, index) => (
            <React.Fragment key={index}>
              <Styles.MessageItem key={index} source={source}>
                {textContent}
              </Styles.MessageItem>
              {imgSrc && <Styles.Image src={imgSrc} alt="catImage" />}
            </React.Fragment>
          ))}
        </Styles.Messages>
        <Styles.Form onSubmit={handleSubmit}>
          <Styles.Input
            value={currentMessage}
            autoComplete={"off"}
            onChange={(e) => dispatch(currentMessageChanged(e.target.value))}
          />
          <Styles.Button
            data-testid="submitButton"
            type="submit"
            variant="contained"
            disabled={!currentMessage || clientStatus !== "idle"}
          >
            {clientStatus === "loading" ? "Connecting..." : "Send"}
          </Styles.Button>
        </Styles.Form>
      </Styles.Content>
    </Styles.AppContainer>
  );
}

export default App;
