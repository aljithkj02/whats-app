import { Message } from "../model/message.model";
import { TypingStatusType, UserMessageType } from "../enums/ws.incoming"
import { connections } from "./poolController";
import { Room } from "../model/room.model";

export const sendMessageToUser = async ( payload: UserMessageType, id: string ) => {
    const { receiverId, message } = payload;
    if(!payload.receiverId) return;

    const receiverConnection = connections.get(payload.receiverId);

    if(receiverConnection) {
        receiverConnection.sendUTF(payload.message);
    } 

    const messageData = await Message.create({
        message,
        receiverId: payload.receiverId,
        senderId: id,
    })

    const room = await Room.find({ 
        isGroup: false, 
        members: { 
            $all: [ receiverId, id ]
        }
    })

    if(room.length) {
        await Room.updateOne({ 
            _id: room[0]._id,
        }, {
            $push: {
                messages: messageData._id,
            }
        })
    } else {
        await Room.create({
            owner: id,
            isGroup: false,
            members: [receiverId, id],
            messages: [messageData._id],
        })
    }

    console.log("Successfully Send the Message!");
}

export const sendMessageToRoom = async ( payload: TypingStatusType, id: string ) => {
    console.log({ payload });
    // connections.forEach((value, key) => {
    //     if(key === id) return;
    //     (value as connection).sendUTF(JSON.stringify(payload));
    // })
}
