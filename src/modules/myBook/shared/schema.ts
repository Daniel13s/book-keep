import z from "zod";

export const paramSchema = z.object({
    id: z.string()
})
export const userSchema = z.object({
    id: z.string(),
    name: z.string()
})
export const querySchema = z.object({
    search: z.string().optional(),
    page: z.string(),
    limit: z.string()
})