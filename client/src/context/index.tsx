import { IMessage } from "interfaces/chat.interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from 'websocket';

interface MyContextMethods {
    sendMessage: (roomId: string, message: string) => void;
    client: W3CWebSocket | null;
}

const myContext = createContext<MyContextMethods | undefined>(undefined);

export const MyContextProvider = ({ children }: { children : ReactNode }) => {
    const [client, setClient] = useState<W3CWebSocket | null>(null);

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
            console.log({newMessage});
            // setMessages((msg) => [newMessage, ...msg])
          }
        };
    }

    const sendMessage = (roomId: string, message: string) => {
        if(!client) return;
        client.send(JSON.stringify({
          type: "SEND_MESSAGE",
          payload: {
            roomId,
            message,
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

export const useMyContext = () => useContext(myContext);