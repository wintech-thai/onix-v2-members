import { z } from "zod";

import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const UpdateUserSchema = z.object({
  Name: z.string().min(1, "editProfile.form.validation.firstNameIsRequired"),
  LastName: z.string().min(1, "editProfile.form.validation.lastNameIsRequired"),
  PhoneNumber: z
    .string()
    .min(1, "editProfile.form.validation.phoneNumberInvalid")
    .refine(
      (val) => {
        try {
          const number = phoneUtil.parseAndKeepRawInput(val, "TH");
          return phoneUtil.isValidNumber(number);
        } catch {
          return false;
        }
      },
      {
        message: "editProfile.form.validation.phoneNumberInvalid",
      }
    ),
  SecondaryEmail: z.email().optional(),
});

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
