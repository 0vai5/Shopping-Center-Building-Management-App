import { z } from "zod";

export const userSchema = z.object({
  _id: z.string(),
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});

export default userSchema;
