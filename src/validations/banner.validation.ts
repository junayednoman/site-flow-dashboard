import * as z from "zod";

// Define the Zod schema for validation
export const bannerSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters"),
});

// Infer the form data type from the schema
export type TBannerFormData = z.infer<typeof bannerSchema>;