import z from "zod";

export const bodySchema = z.object({
    imageUrl: z.string(),
    title: z.string(),
    description: z.string().min(10),
    category: z.string(),
    author: z.string()
})
export const paramSchema = z.object({
    id: z.string().optional(),
})
export const querySchema = z.object({
    category: z.string().optional(),
    search: z.string().optional(),
    limit: z.string(),
    page: z.string()
})