import z from "zod";

export const bodySchema = z.object({
    name: z.string().min(5).optional(),
    email: z.email(),
    password: z.string().min(8)
})
