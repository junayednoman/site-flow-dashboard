import * as z from "zod";

export const createPlanSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  interval: z.string().min(1, "Interval is required"),
  max_users: z.string().min(1, "Max user number is required"),
  price: z
    .string({ required_error: "Price is required" })
    .min(1, "Price is required"),
});

export type CreatePlanFormValues = z.infer<typeof createPlanSchema>;