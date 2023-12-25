import { ILoginInfo, IRegisterInfo } from "interfaces/auth.interface";
import { handleToast, handleToken } from "../utils";

const URL = import.meta.env.VITE_API_URL;

export const loginUser = async (data: ILoginInfo) => {
    try {
        const response = await fetch(`${URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const json = await response.json();
        handleToast(json.status, json.message);
        json?.token && handleToken(json.token);
        return json;
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (data: IRegisterInfo) => {
    try {
        const response = await fetch(`${URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        const json = await response.json();
        handleToast(json.status, json.message);
        json?.token && handleToken(json.token);
        return json;
    } catch (error) {
        console.log(error);
    }
}