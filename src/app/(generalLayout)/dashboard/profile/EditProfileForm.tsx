"use client";

import { Button } from "@/components/ui/button";
import { AInput } from "@/components/form/AInput";
import AForm from "@/components/form/AForm";
import {
  EditProfileFormValues,
  editProfileSchema,
} from "@/validations/profile.validation";

interface EditProfileFormProps {
  defaultValues?: Partial<EditProfileFormValues>;
  onSubmit: (data: EditProfileFormValues) => void;
  isUpdateLoading?: boolean;
}

const EditProfileForm = ({
  defaultValues,
  onSubmit,
  isUpdateLoading,
}: EditProfileFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary-foreground text-center">
        Edit Your Profile
      </h3>

      <AForm<EditProfileFormValues>
        schema={editProfileSchema}
        defaultValues={defaultValues as EditProfileFormValues | undefined}
        onSubmit={onSubmit}
      >
        <AInput
          name="name"
          label="User Name"
          placeholder="Enter your name"
          required
        />
        <AInput
          name="email"
          label="Email"
          type="email"
          disabled
          placeholder="Enter your email"
          required
        />
        <AInput
          name="phone"
          label="Phone no"
          type="tel"
          placeholder="Enter your phone number"
          required
        />
        <Button
          disabled={isUpdateLoading}
          type="submit"
          className="w-full h-[50px]"
        >
          {isUpdateLoading ? "Updating..." : "Update Profile"}
        </Button>
      </AForm>
    </div>
  );
};

export default EditProfileForm;
