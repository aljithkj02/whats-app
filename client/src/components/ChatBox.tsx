import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { StoreType } from "../store"
import { getMessages } from "../apis/chat"
import { IMessage } from "../interfaces/chat.interface"
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const style1 = 'self-start bg-[#202c33] px-3 py-2 rounded-lg max-w-[50%] rounded-tl-none relative'
const style2 = 'self-end bg-[#005c4b] px-3 py-2 rounded-lg max-w-[50%]  rounded-tr-none relative'

export const ChatBox = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { roomId, myId } = useSelector((data: StoreType) => data.chats);
  const [client, setClient] = useState<W3CWebSocket | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token') || 'token';
    
    roomId && fetchMessages();

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
        
        setMessages((msg) => [newMessage, ...msg])
      }
    };

  }, [roomId])

  const fetchMessages = async () => {
    if(!roomId) return;

    const data = await getMessages(roomId);
    if(data) {
      setMessages(data.reverse());
    }
  }

  const sendMessage = () => {
    if(!client) return;
    client.send(JSON.stringify({
      type: "SEND_MESSAGE",
      payload: {
        roomId,
        message: "Good Nyt"
      }
    }))
  }

  return (
    <div className="flex flex-col-reverse gap-4 h-[80vh] px-20 overflow-y-scroll py-6">
      { !messages.length && 
        <p className="text-gray-300 text-center">Start messaging!</p> 
      }
      { myId && messages.map(({ senderId, message, createdAt, _id}: IMessage) => {
        return (
          <div key={_id} className={senderId === myId ? style2: style1}>
            <p className={`text-white`}>{ message }</p>
            <p className="text-[11px] text-zinc-300 text-right">{ new Date(createdAt).toString().slice(0, 16) }</p>
          </div>
        )
      })}
      <button className="bg-red-600" onClick={sendMessage}>TEST ME</button>
    </div>
  )
}
