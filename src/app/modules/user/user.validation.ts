import { z } from "zod";


const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(8).max(50),
    })
})


export const UserValidations = {
    createUserValidationSchema
}