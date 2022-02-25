import styled from "@mui/system/styled";
import TextField from "@mui/material/TextField";
import MuiButton from "@mui/material/Button";
import { Message } from "./chatSlice";

export const AppContainer = styled("div")({
  maxWidth: "550px",
  backgroundColor: "--var-color-primary",
  margin: "200px auto",
  padding: "10px",
  boxShadow:
    "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;",
  borderRadius: "10px",
  "@media (max-width: 768px)": {
    margin: "0 auto",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
});

export const Content = styled("div")({
  display: "grid",
  height: "565px",
  gridTemplateRows: "1fr auto",
  flex: 1,
});

export const Messages = styled("div")({
  padding: "30px 23px",
  display: "flex",
  flexDirection: "column",
  rowGap: 20,
  overflow: "auto",
});

export const MessageItem = styled("div")(
  ({ source }: { source: Message["source"] }) => ({
    backgroundColor:
      source === "bot"
        ? "var(--color-message-bot)"
        : "var(--color-message-user)",
    color: source === "bot" ? "var(--color-primary)" : "var(--color-primary-dark)",
    alignSelf: source === "bot" ? "flex-start" : "flex-end",
    padding: "10px",
    width: "50%",
    borderRadius: "15px",
    wordBreak: "break-word",
  })
);

export const Form = styled("form")({
  width: "100%",
  display: "grid",
  padding: "10px",
  borderRadius: "15px",
  gridTemplateColumns: "1fr auto",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gridGap: "5px",
  },
});

export const Input = styled(TextField)({
  marginRight: "5px",
});

export const Button = styled(MuiButton)({
  backgroundColor: "var(--color-primary)",
  color: "var(--color-primary-dark)",
  cursor: "pointer",
  borderRadius: "none",
  ":disabled": {
    opacity: 0.5,
    cursor: "default",
  },
  minWidth: 150,
  minHeight: 56,
});

export const Image = styled("img")({
  alignSelf: "start",
  width: "50%",
  height: "auto",
  aspectRatio: "1 / 1",
  objectFit: "contain",
});
