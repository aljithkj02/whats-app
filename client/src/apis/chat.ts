import toast from "react-hot-toast";
import { ChatType, IChat } from "../interfaces/chat.interface";
import { handleToast } from "utils";

const URL = import.meta.env.VITE_API_URL;

export const getChats = async (type: ChatType) => {
    try {
        const token = localStorage.getItem('token') || 'token';
        const response = await fetch(`${URL}/room/chats/${type}`, {
            headers: {
                'Content-Type': 'Application/json',
                authorization: token,
            }
        });
        const json: { status: boolean, rooms: IChat[], message?: string} = await response.json();

        if(!json?.status && json.message) {
            handleToast(json.status, json.message);
        }   
        return json.rooms;
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message || 'Something went wrong!');
    }
}