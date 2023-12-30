import { useEffect, useState } from "react";
import { Chats } from "./Chats"
import { Search } from "./Search"
import { LeftHeader } from "./LeftHeader";
import { getChats } from "../apis/chat";
import { ChatType, IChat } from "../interfaces/chat.interface";

export const LeftBar = () => {
    const [isChat, setIsChat] = useState(true);
    const [chatsData, setChatsData] = useState<IChat[]>([]);

    useEffect(() => {
        fetchChats();
    }, [isChat])

    const handleChatChange = (value: boolean) => {
        setIsChat(value);
    }

    const fetchChats = async () => {
        const chats = await getChats(isChat ? ChatType.CHAT : ChatType.ROOM);
        console.log({ chats })
        if(chats) {
            setChatsData(chats);
        }
    }

    return (
        <div>
            <LeftHeader handleChange={handleChatChange} />
            <div className="py-2 fixed w-[30%]" id="leftbar">
                <Search />
                <div className="mt-5">
                    <p className="text-white px-5">
                        { isChat ? 'Friends' : 'Groups'}
                    </p>
                    <Chats chatsData={chatsData} />
                </div>
            </div>
        </div>
    )
}
