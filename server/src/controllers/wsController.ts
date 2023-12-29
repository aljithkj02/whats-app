import { Message } from "../model/message.model";
import { TypingStatusType, UserMessageType } from "../enums/ws.incoming"
import { connections } from "./poolController";

export const sendMessageToUser = async ( payload: UserMessageType, id: string ) => {
    const { receiverId, message } = payload;
    if(!payload.receiverId) return;

    const receiverConnection = connections.get(payload.receiverId);

    if(receiverConnection) {
        receiverConnection.sendUTF(payload.message);
    } 

    await Message.create({
        message: payload.message,
        receiverId: payload.receiverId,
        senderId: id,
    })
    console.log("Successfully Send the Message!");
}

export const sendMessageToRoom = async ( payload: TypingStatusType, id: string ) => {
    console.log({ payload });
    // connections.forEach((value, key) => {
    //     if(key === id) return;
    //     (value as connection).sendUTF(JSON.stringify(payload));
    // })
}