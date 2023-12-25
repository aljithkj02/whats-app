
import { createRoom } from "../controllers/roomController";
import { Router } from "express";

export const roomRouter = Router();

roomRouter.post('/create', createRoom);