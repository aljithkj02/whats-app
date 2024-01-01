import { useEffect, useState } from "react";
import { Chats } from "./Chats"
import { Search } from "./Search"
import { LeftHeader } from "./LeftHeader";
import { getChats, getUsers } from "../apis/chat";
import { ChatType, IChat, IUser } from "../interfaces/chat.interface";
import { useDispatch } from "react-redux";
import { setMyId, setRoomId } from "store/chatSlice";
import { Users } from "./Users";

export const LeftBar = () => {
    const [type, setType] = useState<ChatType>(ChatType.CHAT);
    const [chatsData, setChatsData] = useState<IChat[]>([]);
    const [usersData, setUsersData] = useState<IUser[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchChats();
    }, [type])

    const handleChatChange = (value: ChatType) => {
        setType(value);
    }

    const fetchChats = async () => {
        if(type === ChatType.USERS) {
            const users = await getUsers();
            if(users) {
                setUsersData(users);
            }
        } else {
            const chats = await getChats(type);
            
            if(chats?.id) {
                setChatsData(chats.rooms);
                dispatch(setMyId(chats.id));
                chats.rooms.length && dispatch(setRoomId(chats.rooms[0]._id));
            }
        }
    }

    return (
        <div>
            <LeftHeader handleChange={handleChatChange} />
            <div className="py-2 fixed w-[30%]" id="leftbar">
                <Search />
                <div className="mt-5">
                    <p className="text-white px-5">
                        { type === ChatType.CHAT ? 'Friends' : type === ChatType.ROOM ? 'Groups' : 'Users'}
                    </p>
                    { type === ChatType.USERS ? <Users usersData={usersData} /> : <Chats chatsData={chatsData } /> }
                </div>
            </div>
        </div>
    )
}
