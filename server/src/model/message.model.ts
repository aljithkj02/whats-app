
import { Schema, model } from "mongoose";

const messageSchema = new Schema(
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

export const Message = model('message', messageSchema);