import { SlOptionsVertical } from "react-icons/sl";

export const RightHeader = () => {
  return (
    <div className="flex justify-between items-center bg-[#202c33] px-7 py-3 border-l border-transparent border-l-gray-700">
      <div className="flex items-center gap-4 cursor-pointer">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img src="https://avatars.githubusercontent.com/u/101309469?v=4" alt="logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-white text-xl">DeathLok</p>
      </div>
      <div className="text-white cursor-pointer">
        <SlOptionsVertical />
      </div>
    </div>
  )
}
