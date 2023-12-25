import { useState } from "react";
import { MdOutlineChatBubble } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { handleToken } from "utils";

interface IHeader {
  handleChange: (value: boolean) => void;
}

export const LeftHeader = ({ handleChange }: IHeader) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <div className="flex justify-between items-center bg-[#202c33] px-7 py-3">
      <div className="flex items-center gap-4 cursor-pointer relative" onClick={handleOpen}>
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="https://avatars.githubusercontent.com/u/101309469?v=4" alt="logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-white text-xl">Jithu</p>
        { open && <div className="absolute -bottom-20 bg-slate-600 px-8 py-4 z-10 rounded-md">
          <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 duration-200"
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
              handleToken();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </div> }
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
