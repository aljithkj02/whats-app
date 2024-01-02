import { Message } from "../model/message.model";
import { UserMessageType } from "../enums/ws.incoming"
import { connections } from "./poolController";
import { Room } from "../model/room.model";

export const sendMessageToUser = async ( payload: UserMessageType, id: string ) => {
    const { receiverId, message } = payload;
    if(!receiverId) return;

    const room = await Room.create({ 
        isGroup: false, 
        owner: id,
        members: [ id, receiverId ]
    })

    const messageData = await Message.create({
        message,
        roomId: room._id,
        senderId: id,
    });

    await Room.updateOne({
        _id: room._id,
    }, {
        $push: {
            messages: messageData._id,
        }
    })

    const receiverConnection = connections.get(receiverId);

    if(receiverConnection) {
        receiverConnection.sendUTF(JSON.stringify(messageData));
    } 

    console.log("Successfully Send the Message!");
}

export const sendMessageToRoom = async ( payload: UserMessageType, id: string ) => {
    const { roomId, message } = payload;
    if(!roomId) return;

    const room = await Room.findOne({
        _id: roomId
    }).select('members');

    if(!room){
        console.log('No such room exist!');
        return;
    }

    const messageData = await Message.create({
        message,
        roomId: room._id,
        senderId: id,
    })

    // const members = room.members.filter((_id ) => _id.toString() !== id);
    const members = room.members;

    const receiverConnections = members.map((_id) => {
        return connections.get(_id.toString());
    })

    if(receiverConnections.length) {
        receiverConnections.forEach((conn) => {
            if(conn) {
                conn.sendUTF(JSON.stringify(messageData));
            }
        })
    } 

    await Room.updateOne({ 
        _id: room._id,
    }, {
        $push: {
            messages: messageData._id,
        }
    })

    console.log("Successfully Send the Message!");
}
