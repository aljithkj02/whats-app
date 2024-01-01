import { useDispatch } from "react-redux"
import { IUser } from "../interfaces/chat.interface"
import { SingleUser } from "./SingleUser"
import { setRoomId, setUserName } from "../store/chatSlice"

interface IUsers {
    usersData: IUser[]
}

export const Users = ({ usersData }: IUsers) => {
    const dispatch = useDispatch();

    const handleChatChange = (id: string, name: string) => {
        dispatch(setRoomId(id));
        dispatch(setUserName(name));
    }

    return (
        <div>
            <div className="py-2 flex flex-col gap-1 overflow-y-scroll max-h-[75vh]">
            { usersData.map(({ _id, name, email }) => {
                return (
                    <div key={_id} onClick={() => handleChatChange(_id, name) }>
                        <SingleUser key={_id} name={name} email={email} />
                    </div>
                )
            }) }
            </div>
        </div>
    )
}
