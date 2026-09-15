import z from "zod";

const categorySchema = z.object({
    title: z.string().min(4).max(20).trim(),
    slug: z.string().min(4).max(20).trim()
}).strict();

export {
    categorySchema,
}