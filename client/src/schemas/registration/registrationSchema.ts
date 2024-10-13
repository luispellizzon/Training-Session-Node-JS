import { z } from "zod"

export const registrationSchema = z.object({
    username: z.string().min(1, { message: "Enter a valid Name" }).max(255),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(255),
    passwordConfirmation: z.string().min(6, { message: "Password must be at least 6 characters" }).max(255)
})
    .refine(data => data.password === data.passwordConfirmation, { message: 'Passwords do not match' })

export type RegistrationModel = z.infer<typeof registrationSchema>