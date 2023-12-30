import { ChatType } from "../enums/room.enum";
import z from "zod";

export const HistoryMessageSchema = z.object({
    roomId: z.string(),
})

export const ChatTypeSchema = z.nativeEnum(ChatType)