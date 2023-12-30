import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        roomId: null,
        name: null,
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload;
        }
    }
}) 

export default chatSlice.reducer;
export const { setRoomId } = chatSlice.actions;