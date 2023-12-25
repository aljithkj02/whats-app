import { ChatBox } from "./ChatBox"
import { MessageComposer } from "./MessageComposer"
import { RightHeader } from "./RightHeader"

export const RightBar = () => {
  return (
    <div className="relative" id="rightbar">
        <RightHeader />
        <div className="w-full h-[90vh] bg-[url(https://wallpapers.com/images/featured/dark-laptop-rswupf2cxn4hatxy.jpg)] bg-cover">
            <ChatBox />
            <MessageComposer />
        </div>
    </div>
  )
}
