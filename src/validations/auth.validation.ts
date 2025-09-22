import { z } from "zod";

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormValues) => void;
  isChanging: boolean;
}

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});

export const forgetPasswordValidation = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
});


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  is_remember: z.boolean().default(false).optional(),
});
