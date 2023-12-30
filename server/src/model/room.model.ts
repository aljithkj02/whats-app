import { model, Schema, Document } from 'mongoose'
import { boolean } from 'zod';

export interface IRoom extends Document {
    name: string;
    owner: Schema.Types.ObjectId;
    members: Schema.Types.ObjectId[];
    messages: Schema.Types.ObjectId[];
    isGroup: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        messages: [{
            type: Schema.Types.ObjectId,
            ref: 'room',
        }
        ],
        isGroup: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
)

export const Room = model<IRoom>('room', roomSchema);