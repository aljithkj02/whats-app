import { useEffect, useState } from "react";
import { Chats } from "./Chats"
import { Search } from "./Search"
import { LeftHeader } from "./LeftHeader";
import { getChats, getUsers } from "../apis/chat";
import { ChatType, IChat, IUser } from "../interfaces/chat.interface";
import { useDispatch, useSelector } from "react-redux";
import { setMyId, setRoomId, setUserName } from "store/chatSlice";
import { Users } from "./Users";
import { StoreType } from "store";

export const LeftBar = () => {
    const [type, setType] = useState<ChatType>(ChatType.CHAT);
    const [chatsData, setChatsData] = useState<IChat[]>([]);
    const [usersData, setUsersData] = useState<IUser[]>([]);

    const myId = useSelector((data: StoreType) => data.chats.myId);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchChats();
    }, [type, myId])

    const handleChatChange = (value: ChatType) => {
        setType(value);
    }

    const fetchChats = async () => {
        if(type === ChatType.USERS) {
            const users = await getUsers();
            if(users) {
                setUsersData(users);
                dispatch(setUserName(users[0]?.name || ""));
            }
        } else {
            const chats = await getChats(type);
            
            if(chats?.id) {
                setChatsData(chats.rooms);
                dispatch(setMyId(chats.id));
                if(chats.rooms.length) {
                    const id = chats.rooms[0]._id;
                    const user = chats.rooms[0].members.find(member => member._id !== myId);

                    dispatch(setRoomId(id));
                    dispatch(setUserName(user?.name || ""));
                }
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
