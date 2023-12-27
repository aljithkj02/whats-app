import { Schema, model } from "mongoose";

const userSchema = new Schema(
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

export const User = model('user', userSchema);