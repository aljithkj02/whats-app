import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getUsers, loginUser, registerUser } from "../controllers/authController";

export const authRouter = Router();

authRouter.get('/users', authMiddleware, getUsers);
authRouter.post('/login', loginUser);
authRouter.post('/register', registerUser);