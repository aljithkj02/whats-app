import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    rooms: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        rooms: [{
            type: Schema.Types.ObjectId,
            ref: 'room',
        }]
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        }
    }
)

export const User = model<IUser>('user', userSchema);