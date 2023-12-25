import { MdOutlineChatBubble } from "react-icons/md";
import { MdGroups } from "react-icons/md";

interface IHeader {
  handleChange: (value: boolean) => void;
}

export const Header = ({ handleChange }: IHeader) => {

  return (
    <div className="flex justify-between items-center bg-[#202c33] px-7 py-3">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="https://avatars.githubusercontent.com/u/101309469?v=4" alt="logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-white text-xl">Jithu</p>
      </div>
      <div className="flex gap-6 items-center">
        <div className="text-white text-2xl cursor-pointer"
          onClick={() => handleChange(true)}
        >
            <MdOutlineChatBubble />
        </div>
        <div className="text-white text-3xl cursor-pointer"
          onClick={() => handleChange(false)}
        >
            <MdGroups />
        </div>
      </div>
    </div>
  )
}
