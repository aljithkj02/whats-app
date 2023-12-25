import { model, Schema } from 'mongoose'

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

export const Room = model('room', roomSchema);