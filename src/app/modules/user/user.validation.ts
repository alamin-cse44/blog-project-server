import { z } from "zod";


const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
    })
})

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({required_error: "Email is required"}).email(),
        password: z.string({required_error: "Password is required"}),
    })
})


export const UserValidations = {
    createUserValidationSchema,
    loginValidationSchema,
}