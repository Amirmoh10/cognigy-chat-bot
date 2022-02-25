import { createSlice } from "@reduxjs/toolkit";

export type Message = {
  source: "user" | "bot";
  textContent: string;
  imgSrc?: string;
};

export type ChatState = {
  messages: Message[];
  currentMessage: string;
  clientStatus: "loading" | "idle" | "error";
}

const initialState: ChatState = {
  messages: [],
  currentMessage: "",
  clientStatus: "loading",
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    currentMessageChanged(state, action) {
      state.currentMessage = action.payload;
    },
    messageAdded(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    clientStatusChanged(state, action) {
      state.clientStatus = action.payload;
    },
  },
});

export const { currentMessageChanged, messageAdded, clientStatusChanged } =
  chatSlice.actions;

export default chatSlice.reducer;
