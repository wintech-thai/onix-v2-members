import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "changePassword.form.validation.currentPasswordIsRequired"),
    newPassword: z
      .string()
      .min(8, "changePassword.form.validation.passwordMustBeAtLeast8Characters")
      .regex(/[A-Z]/, "changePassword.form.validation.passwordMustContainUppercase")
      .regex(/[a-z]/, "changePassword.form.validation.passwordMustContainLowercase")
      .regex(/[0-9]/, "changePassword.form.validation.passwordMustContainNumber")
      .regex(/[^A-Za-z0-9]/, "changePassword.form.validation.passwordMustContainSpecialCharacter"),
    confirmPassword: z.string().min(1, "changePassword.form.validation.confirmPasswordIsRequired"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "changePassword.form.validation.passwordsDoNotMatch",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
