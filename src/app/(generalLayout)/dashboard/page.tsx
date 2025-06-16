import AContainer from "@/components/AContainer";
import TopStats from "../sections/dashboard/TopStats";
import { Metadata } from "next";
import CompanyTable from "../sections/dashboard/CompanyTable";
import { EarningOverview } from "../sections/dashboard/EarningOverview";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <main>
      <AContainer>
        <TopStats />
        <div className="mt-6">
          <EarningOverview />
        </div>
        <div className="mt-6">
          <CompanyTable limit={6} />
        </div>
      </AContainer>
    </main>
  );
}
