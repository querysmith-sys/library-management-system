import z from  "zod";

const signupSchema = z.object({
    username: z.string().min(3,"Requires minimum 3 characters"),
    email: z.email({message:"Enter a valid Email"}),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export default signupSchema;