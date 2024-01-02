import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "interfaces/chat.interface";

interface ChatState {
    roomId: string | null;
    myId: string | null;
    receiverId: string | null;
    userName: string;
    roomsPool: { [roomId: string]: IMessage[] };
}

const initialState: ChatState = {
    roomId: null,
    myId: null,
    receiverId: null,
    userName: "",
    roomsPool: {},
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload;
            state.receiverId = null;
        },
        setMyId: (state, action) => {
            state.myId = action.payload;
        },
        setReceiverId: ( state, action ) => {
            state.receiverId = action.payload;
            state.roomId = null;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        pushMessage: (state, action) => {
            const message: IMessage = action.payload;
            if(state.roomsPool[message.roomId]) {
                state.roomsPool[message.roomId].unshift(message);
                return;
            }
            state.roomsPool[message.roomId] = [message];
        },
        updateRoomsPool: (state, action) => {
            const messages: IMessage[] = action.payload;
            if(state.roomId) {
                state.roomsPool[state.roomId] = messages;
            }
        }
    }
}) 

export default chatSlice.reducer;
export const { setRoomId, setMyId, setUserName, pushMessage, updateRoomsPool, setReceiverId } = chatSlice.actions;