import { useMyContext } from "context";
import { ChangeEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { StoreType } from "store";

export const MessageComposer = () => {
  const [text, setText] = useState('');
  const data = useMyContext();
  const roomId = useSelector((data: StoreType) => data.chats.roomId);

  if(!data?.sendMessage) return null;
  const { sendMessage } = data;

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const deliverMessage = () => {
    if(!text || !roomId) return;

    sendMessage(roomId, text);
    setText('');
  }

  return (
    <div className="bg-[#202c33] fixed bottom-0 w-full">
      <div className="px-8 py-3 flex items-center gap-4">
        <div className="w-[66%]">
          <input type="text" placeholder="Type a message" 
            className="px-5 py-3 bg-[#2a3942] rounded-lg w-full outline-none text-white"
            onChange={handleChangeText}
          />
        </div>
        <div className="text-gray-400 text-3xl cursor-pointer"
          onClick={deliverMessage}
        >
          <IoMdSend />
        </div>
      </div>
    </div>
  )
}
