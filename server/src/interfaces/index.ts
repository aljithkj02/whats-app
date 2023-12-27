import { Request } from "express";


export interface IRequest extends Request {
    user?: {
        _id: object;
        email: string;
    }
}