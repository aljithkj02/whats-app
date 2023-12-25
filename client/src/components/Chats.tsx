import { SingleChatBox } from "./SingleChatBox"

export const Chats = () => {
  return (
    <div>
        <div className="py-2 flex flex-col gap-1 overflow-y-scroll max-h-[75vh]">
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
            <SingleChatBox />
        </div>
    </div>
  )
}
