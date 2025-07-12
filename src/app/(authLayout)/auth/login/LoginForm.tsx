"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import * as z from "zod";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import { loginSchema } from "@/validations/auth.validation";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/slice/authSlice";
import handleMutation from "@/utils/handleMutation";
import { ACheckbox } from "@/components/form/ACheckbox";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const onSuccess = (res: any) => {
    const decodedUser = jwtDecode(res.data.accessToken);
    if ((decodedUser as any).role !== "admin")
      return toast.warning("You are not an admin");

    dispatch(setUser({ user: decodedUser, token: res.data.accessToken }));
    router.push(redirectUrl);
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await handleMutation(data, login, "Logging in...", onSuccess);
  };

  return (
    <div className="w-[600px] bg-card rounded-2xl">
      <div>
        <Image src={logo} alt="logo" width={100} height={100} />
      </div>
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to Site FLow</h1>
        <p className="text-card-foreground text-sm">
          Please enter your email and password to login
        </p>
      </div>

      <AForm
        schema={loginSchema}
        defaultValues={{
          email: "junayednoman05@gmail.com",
          password: "password",
        }}
        onSubmit={onSubmit}
      >
        <AInput name="email" label="Email address" type="email" required />
        <AInput name="password" label="Password" type="password" required />

        <div className="flex items-center justify-between">
          <ACheckbox label="Remember password" name="is_remember" />
          <div className="text-right">
            <Link href={"/auth/forgot-password"}>
              <Button
                type="button"
                variant="link"
                className="text-primary p-0 h-auto font-normal"
              >
                Forgot Password
              </Button>
            </Link>
          </div>
        </div>

        <Button disabled={isLoading} type="submit" className="h-12 w-full">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </AForm>
    </div>
  );
};

export default LoginForm;
