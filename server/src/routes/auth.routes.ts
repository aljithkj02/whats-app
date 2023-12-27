import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUsers, loginUser, registerUser } from "../controllers/authController";

export const userRouter = Router();

userRouter.get('/', authMiddleware, getUsers);
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);