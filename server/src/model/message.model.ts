import { Schema, model, Document } from "mongoose";

export interface IMessage extends Document {
    senderId: Schema.Types.ObjectId;
    roomId: Schema.Types.ObjectId | null;
    recieverId: Schema.Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user',
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'room',
            default: null,
        },
        recieverId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
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