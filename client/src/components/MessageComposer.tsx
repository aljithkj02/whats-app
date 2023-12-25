import { IoMdSend } from "react-icons/io";

export const MessageComposer = () => {
  return (
    <div className="bg-[#202c33] fixed bottom-0 w-full">
      <div className="px-8 py-3 flex items-center gap-4">
        <div className="w-[66%]">
          <input type="text" placeholder="Type a message" 
            className="px-5 py-3 bg-[#2a3942] rounded-lg w-full outline-none text-white"
          />
        </div>
        <div className="text-gray-400 text-3xl cursor-pointer">
          <IoMdSend />
        </div>
      </div>
    </div>
  )
}
