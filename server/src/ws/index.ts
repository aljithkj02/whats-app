import { sendMessageToRoom, sendMessageToUser } from "../controllers/wsController";
import { IncomingRequest, IncomingRequestType } from "../enums/ws.incoming";

export const handleRequest = async ( request: IncomingRequest, id: string ) => {
    switch (request.type) {
        case IncomingRequestType.SendMessage:
            if(request.payload.receiverId) {
                sendMessageToUser(request.payload, id);
            } else if(request.payload.roomId) {
                sendMessageToRoom(request.payload, id);
            }else {
                console.log("User has to provide either roomId or receiverId!");
            }
            break;

        case IncomingRequestType.Typing:
            
        break;
    
        default:
            break;
    }
}