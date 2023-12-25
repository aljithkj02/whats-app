import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref: 'room',
    }]
})

export const User = model('user', userSchema);