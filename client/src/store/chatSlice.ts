import { createSlice } from "@reduxjs/toolkit";

interface ChatState {
    roomId: string | null;
    myId: string | null;
    userName: string;
}

const initialState: ChatState = {
    roomId: null,
    myId: null,
    userName: "",
};


export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        },
        setMyId: (state, action) => {
            state.myId = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        }
    }
}) 

export default chatSlice.reducer;
export const { setRoomId, setMyId, setUserName } = chatSlice.actions;