import { Schema, model } from "mongoose";

const poolSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    connection: {
        type: Schema.Types.Mixed,
        default: null,
    }
})

export const Pool = model('pool', poolSchema);