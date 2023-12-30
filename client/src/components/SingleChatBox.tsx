import { IChat } from "../interfaces/chat.interface"

export const SingleChatBox = ({ members, _id: id }: IChat) => {
  const receiverName = members.find(({ _id }) => _id !== id );
  
  return (
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 px-5 duration-200">
        <div className="w-11 h-11 rounded-full overflow-hidden">
            <img src="https://i.pinimg.com/originals/d9/de/11/d9de112b2c4aedef6df31d05194adf21.jpg" alt="logo" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="w-full border border-transparent border-t-gray-800 py-3">
            <p className="text-white text-md font-medium">{ receiverName?.name }</p>
            <p className="text-gray-400 text-sm">Start messaging</p>
        </div>
    </div>
  )
}
