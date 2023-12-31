import { Request, Response } from "express";
import { User } from "../model/user.model";
import { generateToken } from "./jwtController";
import { LoginInfoSchema, RegisterInfoSchema } from "../validators/auth";
import { IRequest } from "../interfaces";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const validate = LoginInfoSchema.safeParse({ email, password });

        if(!validate.success) {
            const message = validate.error.errors[0].message;
            res.status(406).json({
                status: false,
                message,
            })
            return;
        }

        const isUserExist = await User.findOne({ email });
        if(!isUserExist) {
            res.status(404).json({
                status: false,
                message: "User with this email doesn't exist!"
            })
            return;
        }
        
        if(isUserExist?.password !== password) {
            res.status(401).json({
                status: false,
                message: "Incorrect password!"
            })
            return;
        }

        const token = generateToken({ id: isUserExist.id, email: isUserExist.email });

        res.json({
            status: true,
            token,
            message: 'Login Successfully',
        })
        return;
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const validate = RegisterInfoSchema.safeParse({ name, email, password });

        if(!validate.success) {
            const message = validate.error.errors[0].message;
            res.status(406).json({
                status: false,
                message,
            })
            return;
        }

        const isUserExist = await User.findOne({ email });
        if(isUserExist) {
            res.status(404).json({
                status: false,
                message: 'User with this email already exist!'
            })
            return;
        }

        const user = await User.create({
            name,
            email,
            password
        })

        const token = generateToken({ id: user.id, email });

        res.json({
            status: true,
            token,
            message: 'Register Successfully',
        })
        return;
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async (req: IRequest, res: Response) => {
    const users = await User.find({ 
        _id: { 
            $ne: req.user?._id 
        }
    }).select('name email')
    
    res.json({
        status: true,
        users,
    })
}

export const findUserById = async (id: string) => {
    const user = User.findById({ _id: id });
    return user;
}
