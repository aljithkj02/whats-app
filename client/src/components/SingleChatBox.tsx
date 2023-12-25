
export const SingleChatBox = () => {
  return (
    <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-800 px-5 duration-200">
        <div className="w-11 h-11 rounded-full overflow-hidden">
            <img src="https://avatars.githubusercontent.com/u/101309469?v=4" alt="logo" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="w-full border border-transparent border-t-gray-800 py-3">
            <p className="text-white text-md font-medium">Jithu</p>
            <p className="text-white text-sm">Hello.. How are you man..</p>
        </div>
    </div>
  )
}
