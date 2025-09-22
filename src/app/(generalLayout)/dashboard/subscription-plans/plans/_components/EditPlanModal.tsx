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
import { useUpdateSubscriptionPlanMutation } from "@/redux/api/subscriptionPlanApi";
import handleMutation from "@/utils/handleMutation";
import { useState } from "react";

const EditPlanModal = ({
  children,
  plan,
}: {
  children: React.ReactNode;
  plan: any;
}) => {
  const [open, setOpen] = useState(false);
  const [updateSubscriptionPlan, { isLoading }] =
    useUpdateSubscriptionPlanMutation();
  const intervalOptions = [
    { value: "day", label: "Daily" },
    { value: "month", label: "Monthly" },
    { value: "year", label: "Yearly" },
  ];

  const handleSubmit = async (data: any) => {
    data.price = Number(data.price);
    data.max_users = Number(data.max_users);
    handleMutation(
      { payload: data, id: plan._id },
      updateSubscriptionPlan,
      "Updating plan...",
      () => {
        setOpen(false);
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
        </DialogHeader>
        <AForm<CreatePlanFormValues>
          schema={createPlanSchema}
          onSubmit={handleSubmit}
          defaultValues={{
            name: plan.name,
            interval: plan.interval,
            max_users: plan.max_users?.toString(),
            price: plan.price.toString(),
          }}
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
            {isLoading ? "Updating..." : "Update Plan"}
          </Button>
        </AForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanModal;
