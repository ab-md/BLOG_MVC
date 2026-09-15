import z from "zod";

const registerSchema = z.object({
    username: z.string().min(4).max(30).trim().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(30)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Confirm password doesn't match",
    path: ["confirmPassword"]
}).strict();

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(30)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
}).strict();

const passwordSchema = z.object({
    currentPassword: z.string(),
    password: z.string().min(6).max(30)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, {
            message: "Password must include a special character and a number at least"
        }),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Confirm password doesn't match",
    path: ["confirmPassword"]
}).strict();

export {
    registerSchema,
    loginSchema,
    passwordSchema,
}