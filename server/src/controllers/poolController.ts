import { connection } from "websocket";
import { IAddPool } from "../interfaces/pool.interface";

export const connections = new Map<string, connection>();

export const addConnection = ({ userId, connection }: IAddPool) => {
    connections.set(userId, connection );
}

export const removeConnection = (userId: string) => {
    connections.delete(userId);
    console.log(userId, 'Disconnected!');
}