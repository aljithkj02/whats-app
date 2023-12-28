import { Schema, model, Document } from "mongoose";


export interface IPool extends Document {
    userId: Schema.Types.ObjectId;
    connection: object;
    createdAt: Date;
    updatedAt: Date;
}

const poolSchema = new Schema<IPool>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        connection: {
            type: Schema.Types.Mixed,
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

export const Pool = model<IPool>('pool', poolSchema);