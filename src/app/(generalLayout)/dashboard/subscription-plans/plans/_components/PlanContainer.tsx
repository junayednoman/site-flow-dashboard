"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PlanCard from "./PlanCard";
import CreatePlanModal from "./CreatePlanModal";
import { useGetSubscriptionPlansQuery } from "@/redux/api/subscriptionPlanApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";

const PlanContainer = () => {
  const {
    data: subscriptionPlans,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSubscriptionPlansQuery("");
  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Subscription Plans
        </h1>
        <CreatePlanModal>
          <Button size={"lg"}>
            <Plus className="!w-5 !h-5" />
            Create New Plan
          </Button>
        </CreatePlanModal>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {subscriptionPlans?.data?.map((plan: any) => (
          <PlanCard key={plan.id} plan={plan} />
        )) || <div>No plans available.</div>}
      </div>
    </section>
  );
};

export default PlanContainer;
