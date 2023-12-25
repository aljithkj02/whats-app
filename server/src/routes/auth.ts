import { loginUser } from "../controllers/authController";
import { Router } from "express";

export const userRouter = Router();

userRouter.post('/login', loginUser);