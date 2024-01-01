import { IChat } from "interfaces/chat.interface"
import { SingleChatBox } from "./SingleChatBox"
import { useDispatch, useSelector } from "react-redux"
import { StoreType } from "../store"
import { setRoomId } from "../store/chatSlice"

export const Chats = ({ chatsData }: { chatsData: IChat[] }) => {
  const myId = useSelector((data: StoreType) => data.chats.myId);

  const dispatch = useDispatch();

  const handleChatChange = (id: string) => {
    dispatch(setRoomId(id));
  }

  return (
    <div>
        <div className="py-2 flex flex-col gap-1 overflow-y-scroll max-h-[75vh]">
          { myId && chatsData.map((chats) => {
            return <div key={chats._id} onClick={() => handleChatChange(chats._id)}>
              <SingleChatBox {...chats} myId={myId} />
            </div>
          }) }
        </div>
    </div>
  )
}
