import { useState } from "react"
import { useSelector } from "react-redux"
import { StoreType } from "../store"


const data = [
  {
    id: 1,
    name: 'Jithu',
    message: 'Gd mrng, How are you doing today? Gd mrng, How are you doing today? Gd mrng, How are you doing today?'
  },
  {
    id: 1,
    name: 'Jithu',
    message: 'Bye bye guys'
  },
  {
    id: 2,
    name: 'Jithu',
    message: 'Gd mrng, How are you doing today? Gd mrng, How are you doing today? Gd mrng, How are you doing today?'
  },
]

const style1 = 'self-start bg-[#005c4b] px-3 py-2 rounded-lg max-w-[50%] rounded-tl-none relative'
const style2 = 'self-end bg-[#202c33] px-3 py-2 rounded-lg max-w-[50%]  rounded-tr-none relative'

export const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const roomId = useSelector((data: StoreType) => data.chats.roomId);
  console.log({ roomId })
  return (
    <div className="flex flex-col-reverse gap-4 h-[80vh] px-20 overflow-y-scroll py-6">
      { messages.map(({ id, message}) => {
        return (
          <div className={id === 1 ? style1: style2}>
            <p className={`text-white`}>{ message }</p>
            <p className="text-[11px] text-zinc-300 text-right">10:23 am</p>
          </div>
        )
      })}
    </div>
  )
}
