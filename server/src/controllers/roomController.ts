import { Request, Response } from "express";
import { Room } from "../model/room.model";
import { ChatTypeSchema, HistoryMessageSchema } from "../validators/query";
import { Message } from "../model/message.model";
import { IRequest } from "../interfaces";
import { ChatType } from "../enums/room.enum";

export const createRoom = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.find();
        console.log({ rooms })
    } catch (error) {
        console.log(error);
    }
}

export const getMessagesFromRoom = async (req: Request, res: Response) => {
    try {
        const { isRoom, roomId } = req.query;

        const validate = HistoryMessageSchema.safeParse({ isRoom, roomId });

        if(!validate.success) {
            const message = validate.error.errors[0].message;
            res.status(406).json({
                status: false,
                message,
            })
            return;
        }

        const room = await Room.findOne({ 
            _id: roomId,
            isGroup: isRoom,
        })

        if(!room) {
            res.status(404).json({
                status: false,
                message: 'No such chat exist!',
            })
            return;
        }

        const messages = await Message.find({
            _id: {
                $in: room.messages,
            }
        })
        
        res.json({
            status: true,
            messages,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getChats = async (req: IRequest, res: Response) => {
    try {
        const id = req.user?._id;
        if(!id) return;

        const { type } = req.params;

        const validate = ChatTypeSchema.safeParse(type);

        if(!validate.success) {
            const message = validate.error.errors[0].message;
            res.status(406).json({
                status: false,
                message,
            })
            return;
        }
        
        const rooms = await Room.find({
            isGroup: type === ChatType.CHAT ? false : true,
            members: id,
        })

        res.json({
            status: true,
            rooms,
        })

    } catch (error) {
        console.log(error);
    }
}