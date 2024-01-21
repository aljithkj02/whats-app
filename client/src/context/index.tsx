import { IMessage } from "interfaces/chat.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pushMessage, setRoomId } from "store/chatSlice";
import { w3cwebsocket as W3CWebSocket } from 'websocket';

interface MyContextMethods {
    sendMessage: ({ roomId, message, receiverId }: IInputMsg) => void;
    client: W3CWebSocket | null;
}

interface IInputMsg { 
    roomId?: string;
    message: string; 
    receiverId?: string 
}

const myContext = createContext<MyContextMethods | undefined>(undefined);

export const MyContextProvider = ({ children }: { children : ReactNode }) => {
    const [client, setClient] = useState<W3CWebSocket | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        connectWS();
    }, [])

    const connectWS = () => {
        const token = localStorage.getItem('token') || 'token';
        const client = new W3CWebSocket(`ws://localhost:3000/${token}`, 'echo-protocol');
        setClient(client);
    
        client.onerror = function(err) {
            console.log('Connection Error', err.message);
        };
        
        client.onopen = function() {
            console.log('WebSocket Client Connected');
        };
    
        client.onclose = function() {
            console.log('echo-protocol Client Closed');
        };
        
        client.onmessage = function(e) {
          if(typeof e.data === 'string') {
            const newMessage: IMessage = JSON.parse(e.data);
            // console.log({newMessage});
            dispatch(pushMessage(newMessage));
            dispatch(setRoomId(newMessage._id));
          }
        };
    }

    const sendMessage = ({ roomId, message, receiverId }: IInputMsg) => {
        if(!client) return;
        client.send(JSON.stringify({
          type: "SEND_MESSAGE",
          payload: {
            message,
            ...(roomId && { roomId }),
            ...(receiverId && { receiverId })
          }
        }))
    }

    return (
        <myContext.Provider value={{
            sendMessage,
            client
        }}>
            { children }
        </myContext.Provider>
    )
}

export const useMyContext = () => useContext<MyContextMethods | undefined>(myContext);