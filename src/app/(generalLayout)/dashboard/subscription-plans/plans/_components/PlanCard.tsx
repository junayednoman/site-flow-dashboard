"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import EditPlanModal from "./EditPlanModal";

interface Plan {
  id: string;
  name: string;
  interval: string;
  max_users: string;
  price: number;
}

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="w-full rounded-lg p-6 border border-gray-200 bg-white">
      <div>
        <h4 className="text-2xl font-semibold text-gray-900">{plan.name}</h4>
      </div>
      <div className="space-y-4 mt-8">
        <div className="text-4xl font-bold text-gray-900">
          ${plan.price}
          <span className="text-base font-normal text-card-foreground">
            /{plan.interval}
          </span>
        </div>
        <div className="text-sm text-card-foreground">
          {plan.max_users} Users
        </div>
        <div className="grid grid-cols-1 mt-8">
          <EditPlanModal plan={plan}>
            <Button className="bg-primary/10 hover:bg-primary/20 shadow-none text-primary h-[42px] w-full">
              <Pencil /> Edit Price
            </Button>
          </EditPlanModal>
        </div>
      </div>
    </div>
  );
}
