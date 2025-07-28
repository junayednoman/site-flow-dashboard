import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "User name is required")
    .min(2, "User name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Contact number is required")
    .min(10, "Contact number must be at least 10 digits"),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;