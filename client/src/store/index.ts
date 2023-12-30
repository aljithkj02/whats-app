import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./chatSlice";

export const appStore = configureStore({
    reducer: {
        chats: chatsReducer
    }
})

export type StoreType = ReturnType<typeof appStore.getState>;