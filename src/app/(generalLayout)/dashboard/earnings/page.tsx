import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import EarningOverviewTable from "./_components/EarningOverviewTable";

export const metadata: Metadata = {
  title: "Earning Overview",
};

const Earnings = () => {
  return (
    <main>
      <AContainer>
        <EarningOverviewTable />
      </AContainer>
    </main>
  );
};

export default Earnings;
