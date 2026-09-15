import z from "zod";

const postSchema = z.object({
    title: z.string().min(5).max(60).trim(),
    slug: z.string().min(5).max(60).trim(),
    text: z.string().min(10).trim(),
    status: z.string(),
    category: z.string()
}).strict();

export {
    postSchema,
}