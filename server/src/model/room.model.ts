import { model, Schema } from 'mongoose'

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
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

export const Room = model('room', roomSchema);