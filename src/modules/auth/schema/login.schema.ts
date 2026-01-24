import { z } from "zod";

export const loginSchema = z.object({
  userName: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
