import { useState } from "react";
import { Chats } from "./Chats"
import { Search } from "./Search"
import { Header } from "./Header";

export const LeftBar = () => {
    const [isChat, setIsChat] = useState(true);

    const handleChatChange = (value: boolean) => {
        setIsChat(value);
    }

    return (
        <div>
            <Header handleChange={handleChatChange} />
            <div className="py-2 fixed w-[30%]" id="leftbar">
                <Search />
                <div className="mt-5">
                    <p className="text-white px-5">
                        { isChat ? 'Friends' : 'Groups'}
                    </p>
                    <Chats />
                </div>
            </div>
        </div>
    )
}
