import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../store"
import { getMessages } from "../apis/chat"
import { IMessage } from "../interfaces/chat.interface" 
import { updateRoomsPool } from "store/chatSlice"

const style1 = 'self-start bg-[#202c33] px-3 py-2 rounded-lg max-w-[50%] rounded-tl-none relative'
const style2 = 'self-end bg-[#005c4b] px-3 py-2 rounded-lg max-w-[50%]  rounded-tr-none relative'

export const ChatBox = () => {
  const { roomId, myId, roomsPool } = useSelector((data: StoreType) => data.chats);
  
  const messages = roomId ? roomsPool[roomId] : [];
  const dispatch = useDispatch();

  useEffect(() => {
    roomId && fetchMessages();
  }, [roomId])

  const fetchMessages = async () => {
    if(!roomId) return;

    const data = await getMessages(roomId);
    if(data) {
      dispatch(updateRoomsPool(data.reverse()));
    }
  }

  return (
    <div className="flex flex-col-reverse gap-4 h-[80vh] px-20 overflow-y-scroll py-6">
      { !messages?.length && 
        <p className="text-gray-300 text-center">Start messaging!</p> 
      }
      { myId && messages?.map(({ senderId, message, createdAt, _id}: IMessage) => {
        return (
          <div key={_id} className={senderId === myId ? style2: style1}>
            <p className={`text-white`}>{ message }</p>
            <p className="text-[11px] text-zinc-300 text-right">{ new Date(createdAt).toString().slice(0, 16) }</p>
          </div>
        )
      })}
    </div>
  )
}
