import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, "form.validation.userName"),
  password: z.string().min(1, "form.validation.password"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
