import { Request, Response } from "express";
import { User } from "../model/user.model";
import { generateToken } from "./jwtController";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

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
