import { IoSearchOutline } from "react-icons/io5";

export const Search = () => {
  return (
    <div className="bg-[#202c33] flex items-center gap-10 px-4 py-2 rounded-xl mx-5">
        <div className="text-xl text-white">
            <IoSearchOutline />
        </div>
        <div>
            <input type='text' placeholder="Search or start new chat" 
                className="bg-[#202c33] outline-none text-white"
            />
        </div>
    </div>
  )
}
