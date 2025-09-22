"use client";

import AContainer from "@/components/AContainer";
import { EarningOverview } from "./EarningOverview";
import CompanyListTable from "../company-list/_components/CompanyTable";
import StatCard from "@/components/others/StatCard";
import UsersIcon from "@/assets/users.svg";
import EarningIcon from "@/assets/earning.svg";
import SubsIcon from "@/assets/subs.svg";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { useState } from "react";
import {
  useGetDashboardSummaryQuery,
  useGetEarningSummaryQuery,
} from "@/redux/api/dashboardApi";

const DashboardContainer = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());

  const {
    data: summaryResponse,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
    error: summaryError,
    refetch: refetchSummary,
  } = useGetDashboardSummaryQuery("");

  const {
    data: earningResponse,
    isLoading: isEarningLoading,
    isError: isEarningError,
    error: earningError,
    refetch: refetchEarning,
  } = useGetEarningSummaryQuery({ year: Number(year) });

  const isLoading = isSummaryLoading || isEarningLoading;
  const isError = isSummaryError || isEarningError;

  const handleRetry = () => {
    if (isSummaryError) refetchSummary();
    if (isEarningError) refetchEarning();
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return (
      <AErrorMessage
        error={summaryError || earningError}
        onRetry={handleRetry}
        className="py-64"
      />
    );

  const summary = summaryResponse?.data || {
    totalUsers: 0,
    totalEarnings: 0,
    activeSubscriptions: 0,
  };
  const earnings = earningResponse?.data || [];

  return (
    <AContainer>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          icon={UsersIcon}
          value={summary.totalUsers.toString()}
        />
        <StatCard
          title="Total Earnings"
          icon={EarningIcon}
          value={`$${summary.totalEarnings}`}
        />
        <StatCard
          title="Active Subscriptions"
          icon={SubsIcon}
          value={summary.activeSubscriptions.toString()}
        />
      </div>
      <div className="mt-6">
        <EarningOverview year={year} setYear={setYear} data={earnings} />
      </div>
      <div className="mt-6">
        <CompanyListTable limit={6} />
      </div>
    </AContainer>
  );
};

export default DashboardContainer;
