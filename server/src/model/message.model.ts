import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
    message: string;
    senderId: Schema.Types.ObjectId;
    roomId: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        message: {
            type: String,
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'room',
            default: null,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
)

export const Message = model<IMessage>('message', messageSchema);