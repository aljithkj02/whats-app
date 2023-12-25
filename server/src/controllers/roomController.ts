import { Request, Response } from "express";
import { Room } from "../model/room.model";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        console.log({ rooms })
    } catch (error) {
        console.log(error);
    }
}