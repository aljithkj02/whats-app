import { Schema, model } from "mongoose";

const poolSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    connection: {
        type: Schema.Types.Mixed,
        default: null,
    }
})

export const Pool = model('pool', poolSchema);