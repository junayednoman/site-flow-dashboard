"use client";

import { Button } from "@/components/ui/button";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import {
  ChangePasswordFormProps,
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/validations/auth.validation";

const ChangePasswordForm = ({
  onSubmit,
  isChanging,
}: ChangePasswordFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary-foreground text-center">
        Change Password
      </h3>

      <AForm<ChangePasswordFormValues>
        schema={changePasswordSchema}
        defaultValues={
          { old_password: "", new_password: "", confirm_password: "" } as
            | ChangePasswordFormValues
            | undefined
        }
        onSubmit={onSubmit}
      >
        <AInput
          name="old_password"
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          required
        />
        <AInput
          name="new_password"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          required
        />
        <AInput
          name="confirm_password"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          required
        />
        <Button disabled={isChanging} type="submit" className="w-full h-[50px]">
          {isChanging ? "Changing..." : "Change Password"}
        </Button>
      </AForm>
    </div>
  );
};

export default ChangePasswordForm;
