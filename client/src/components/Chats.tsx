import { IChat } from "interfaces/chat.interface"
import { SingleChatBox } from "./SingleChatBox"

export const Chats = ({ chatsData }: { chatsData: IChat[] }) => {
  return (
    <div>
        <div className="py-2 flex flex-col gap-1 overflow-y-scroll max-h-[75vh]">
          { chatsData.map((chats) => {
            return <SingleChatBox {...chats} />
          }) }
        </div>
    </div>
  )
}
