import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import CompanyListTable from "../../sections/dashboard/CompanyTable";

export const metadata: Metadata = {
  title: "Company List",
};

const CompanyList = () => {
  return (
    <main>
      <AContainer>
        <CompanyListTable limit={11} pagination />
      </AContainer>
    </main>
  );
};

export default CompanyList;
