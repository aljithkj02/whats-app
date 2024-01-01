import { IUser } from "../interfaces/chat.interface"
import { SingleUser } from "./SingleUser"

interface IUsers {
    usersData: IUser[]
}

export const Users = ({ usersData }: IUsers) => {
  return (
    <div>
        <div className="py-2 flex flex-col gap-1 overflow-y-scroll max-h-[75vh]">
          { usersData.map(({ _id, name, email }) => {
            return <SingleUser key={_id} name={name} email={email} />
          }) }
        </div>
    </div>
  )
}
