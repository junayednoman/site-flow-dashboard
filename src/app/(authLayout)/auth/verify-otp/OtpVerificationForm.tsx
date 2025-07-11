"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { otpSchema } from "@/validations/auth.validation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useRouter, useSearchParams } from "next/navigation";
import handleMutation from "@/utils/handleMutation";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";

// Infer the form data type from the schema
type TOtpVerificationFormValues = z.infer<typeof otpSchema>;

const OtpVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || ""; // Get email from URL query
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [forgotPassword, { isLoading: isResending }] =
    useForgotPasswordMutation();

  // Initialize the form with React Hook Form and Zod resolver
  const form = useForm<TOtpVerificationFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle OTP verification success
  const onVerifySuccess = () => {
    router.push(`/auth/set-new-password?email=${email}`); // Adjust redirect URL as needed
  };

  // Handle resend code success
  const onResendSuccess = () => {
    // No toast; handled by handleMutation
  };

  // Handle form submission
  const onSubmit = async (data: TOtpVerificationFormValues) => {
    const payload = {
      otp: data.otp,
      email,
    };
    handleMutation(payload, verifyOtp, "Verifying OTP...", onVerifySuccess);
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (!email) {
      // Fallback error handling if email is missing
      return;
    }
    handleMutation(
      { email },
      forgotPassword,
      "Resending OTP...",
      onResendSuccess
    );
  };

  return (
    <div className="w-[450px]">
      {/* Header */}
      <div>
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-2">Verify your OTP</h1>
        <p className="text-card-foreground text-sm">
          Please enter your 6 digit OTP
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* OTP Field */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    className="flex !justify-center"
                  >
                    <InputOTPGroup className="space-x-2">
                      <InputOTPSlot
                        index={0}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={1}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={2}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-muted-foreground" />
                    <InputOTPGroup className="space-x-2">
                      <InputOTPSlot
                        index={3}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={4}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                      <InputOTPSlot
                        index={5}
                        className="bg-background border-border text-foreground placeholder:text-muted-foreground h-15 w-15 rounded-lg text-center"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resend Code */}
          <div>
            <p className="text-muted-foreground text-sm mb-2">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={handleResendCode}
                className="text-primary hover:underline"
                disabled={isResending || !email}
              >
                {isResending ? "Resending..." : "Resend Code"}
              </button>
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full h-12" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OtpVerificationForm;
