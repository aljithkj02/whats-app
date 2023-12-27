
import z from 'zod';

export const RegisterInfoSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid Email"}),
    password: z.string().min(4, { message: "Password length should be min 4"})
        .max(10, { message: "Password length should be max 10"}),
})

export const LoginInfoSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, { message: "Password length should be min 4"})
})