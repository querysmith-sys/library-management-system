import z, { email } from  "zod";

const loginSchema = z.object({
    username: z.string().min(3,"Requires minimum 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export default loginSchema;