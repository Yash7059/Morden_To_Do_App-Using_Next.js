import { z } from "zod";

export const todoSchema = z.object({
    title:z.string().min(1).max(100)
})


export const todoActionSchema = z.object({
    title:z.string().min(1).max(100),
    completed:z.boolean().optional()
})