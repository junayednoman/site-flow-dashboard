"use client";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { ASelect } from "@/components/form/ASelect";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CreatePlanFormValues,
  createPlanSchema,
} from "@/validations/plan.validation";
import { useCreateSubscriptionPlanMutation } from "@/redux/api/subscriptionPlanApi";
import handleMutation from "@/utils/handleMutation";
import { FieldValues } from "react-hook-form";
import { useState } from "react";

const CreatePlanModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [createSubscriptionPlan, { isLoading }] =
    useCreateSubscriptionPlanMutation();
  const intervalOptions = [
    { value: "day", label: "Daily" },
    { value: "month", label: "Monthly" },
    { value: "year", label: "Yearly" },
  ];

  const handleSubmit = async (data: FieldValues) => {
    data.price = Number(data.price);
    data.max_users = Number(data.max_users);

    handleMutation(data, createSubscriptionPlan, "Creating plan...", () => {
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Create New Subscription Plan</DialogTitle>
        </DialogHeader>
        <AForm<CreatePlanFormValues>
          schema={createPlanSchema}
          onSubmit={handleSubmit}
          className="mt-5"
        >
          <AInput
            name="name"
            label="Plan Name"
            placeholder="Plan Name"
            required
          />
          <ASelect
            name="interval"
            label="Interval"
            options={intervalOptions}
            placeholder="Select interval"
            required
          />
          <AInput
            name="max_users"
            label="Max Users"
            placeholder="Enter max users"
            required
          />
          <AInput name="price" label="Price" placeholder="0" required />
          <Button disabled={isLoading} type="submit" className="h-12 w-full">
            {isLoading ? "Creating..." : "Create Plan"}
          </Button>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlanModal;
