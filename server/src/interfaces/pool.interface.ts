import { connection } from "websocket";

export interface IAddPool {
    userId: string;
    connection: connection;
}