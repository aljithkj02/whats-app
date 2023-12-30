import z from "zod";

export type IncomingRequest = {
    type: IncomingRequestType.SendMessage;
    payload: UserMessageType;
} | {
    type: IncomingRequestType.Typing;
    payload: TypingStatusType;
}

export enum IncomingRequestType {
    SendMessage = 'SEND_MESSAGE',
    Typing = 'TYPING',
}

export const UserMessage = z.object({
    message: z.string(),
    receiverId: z.string().optional(),
    roomId: z.string().optional(),
})

export const TypingStatus = z.object({
    receiverId: z.string().optional(),
    roomId: z.string().optional(),
})

export type UserMessageType = z.infer<typeof UserMessage>;
export type TypingStatusType = z.infer<typeof TypingStatus>;