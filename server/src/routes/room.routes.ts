
import { createRoom, getChats, getMessagesFromRoom } from "../controllers/roomController";
import { Router } from "express";

export const roomRouter = Router();

roomRouter.post('/create', createRoom);
roomRouter.get('/chats/:type', getChats);
roomRouter.get('/messages', getMessagesFromRoom);