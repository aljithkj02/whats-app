import { model, Schema, Document } from 'mongoose'

export interface IRoom extends Document {
    name: string;
    owner: Schema.Types.ObjectId;
    members: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const roomSchema = new Schema<IRoom>(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        members: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
)

export const Room = model<IRoom>('room', roomSchema);