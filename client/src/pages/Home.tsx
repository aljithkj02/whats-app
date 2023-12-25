import { RightBar } from "../components/RightBar";
import { LeftBar } from "../components/LeftBar";

export const Home = () => {
  return (
    <div className="w-screen h-screen bg-black flex">
      <div className="w-[30%] h-full bg-[#111b21]">
        <LeftBar />
      </div>
      <div className="w-[70%] max-h-screen">
        <RightBar />
      </div>
    </div>
  )
}
