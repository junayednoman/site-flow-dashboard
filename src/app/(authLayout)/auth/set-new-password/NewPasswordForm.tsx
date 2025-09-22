"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import handleMutation from "@/utils/handleMutation";
import { useResetForgottenPasswordMutation } from "@/redux/api/authApi";

const new_passwordSchema = z
  .object({
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password cannot exceed 50 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type TNewPasswordValues = z.infer<typeof new_passwordSchema>;

const NewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resetPassword, { isLoading }] = useResetForgottenPasswordMutation();

  const form = useForm<TNewPasswordValues>({
    resolver: zodResolver(new_passwordSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  const onSuccess = () => {
    router.push("/auth/login");
  };

  const onSubmit = (data: TNewPasswordValues) => {
    if (!email) {
      return;
    }
    const password = { email, password: data.confirm_password };
    handleMutation(
      password,
      resetPassword,
      "Saving new password...",
      onSuccess
    );
  };

  return (
    <div className="w-[600px] bg-card rounded-2xl">
      {/* Header */}
      <Button
        type="button"
        variant="link"
        className="text-card-foreground p-0 h-auto text-lg font-medium"
      >
        <Link href="/auth/login" className="flex items-center gap-3">
          <ArrowLeft className="!w-5 !h-5" />
          <span>Back to login</span>
        </Link>
      </Button>
      <div className="mb-8 mt-10">
        <h1 className="text-2xl font-bold text-card-foreground mb-2">
          Set New Password
        </h1>
        <p className="text-muted-foreground text-sm">
          Create a new password for your account
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-card-foreground font-medium">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-card-foreground font-medium">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground h-12 rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-background placeholder:text-muted-foreground h-12 rounded-lg font-medium"
            disabled={isLoading || !email}
          >
            {isLoading ? "Saving..." : "Save New Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPassword;
