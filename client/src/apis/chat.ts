import toast from "react-hot-toast";
import { ChatType, IChat, IMessage, IUser } from "../interfaces/chat.interface";
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
        const json: { status: boolean, rooms: IChat[], message?: string, id: string} = await response.json();

        if(!json?.status && json.message) {
            handleToast(json.status, json.message);
        }   
        return {
            id: json.id,
            rooms: json.rooms,
        };
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message || 'Something went wrong!');
    }
}

export const getMessages = async (roomId: string) => {
    try {
        const token = localStorage.getItem('token') || 'token';
        const response = await fetch(`${URL}/room/messages/${roomId}`, {
            headers: {
                'Content-Type': 'Application/json',
                authorization: token,
            }
        });
        const json: { status: boolean, messages: IMessage[], message?: string} = await response.json();

        if(!json?.status && json.message) {
            handleToast(json.status, json.message);
        }   
        console.log(json);
        return json.messages;
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message || 'Something went wrong!');
    }
}

export const getUsers = async () => {
    try {
        const token = localStorage.getItem('token') || 'token';
        const response = await fetch(`${URL}/auth/users`, {
            headers: {
                'Content-Type': 'Application/json',
                authorization: token,
            }
        });

        const json: { status: boolean, users: IUser[], message?: string } = await response.json();
        
        if(!json?.status && json.message) {
            handleToast(json.status, json.message);
        }   
        return json.users;
    } catch (error) {
        console.log(error);
        toast.error((error as Error)?.message || 'Something went wrong!');
    }
}