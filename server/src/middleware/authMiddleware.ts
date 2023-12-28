import { findUserById } from "../controllers/authController";
import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ').pop();
    if(!token) {
        res.status(401).json({
            status: false,
            message: 'Unauthorized User'
        })
        return;
    }

    const isValid = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    if(!isValid || typeof isValid === 'string') {
        res.status(401).json({
            status: false,
            message: 'Invalid Token'
        })
        return;
    }

    const user = await findUserById(isValid.id);

    if(!user) {
        res.status(401).json({
            status: false,
            message: 'Invalid Token'
        })
        return;
    }
    
    req['user'] = user;
    next();
}

export const validateWSRequest = async (token: string) => {
    const isValid = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    if(!isValid || typeof isValid === 'string') {
        return {
            status: false,
            message: 'Invalid Token'
        }
    }

    return {
        status: true,
        id: isValid.id
    }
}