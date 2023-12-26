import jwt from 'jsonwebtoken'
import { IJwtRawObject } from "../interfaces/jwt.interface";

export const generateToken = (rawObj: IJwtRawObject): string => {
    const token = jwt.sign(rawObj, process.env.JWT_SECRET || 'secret');
    return token;
}