"use client";

import { Button } from "@/components/ui/button";
import { Eye, Lock, Search, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Input } from "@/components/ui/input";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import {
  useGetCompanyAdminsQuery,
  useChangeCompanyStatusMutation,
} from "@/redux/api/companyAdminApi";
import handleMutation from "@/utils/handleMutation";
import { UserDetailsModal } from "./UserDetailsModal";
import { TCompanyData } from "@/interface/company.interface";
import { defaultImg } from "@/data/global.data";

const statusOptions = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
];

const CompanyListTable = ({
  pagination = false,
  limit = 10,
}: {
  pagination?: boolean;
  limit?: number;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<TCompanyData | null>(
    null
  );

  // Debug query parameters
  useEffect(() => {
    console.log("Query Params:", {
      search: debouncedSearchText || undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      page: currentPage,
      limit,
    });
  }, [debouncedSearchText, statusFilter, currentPage, limit]);

  const {
    data: companyResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCompanyAdminsQuery({
    searchTerm: debouncedSearchText || undefined,
    is_blocked:
      statusFilter !== "all"
        ? statusFilter === "blocked"
          ? true
          : false
        : undefined,
    page: currentPage,
    limit,
  });

  const [changeCompanyStatus, { isLoading: isChangingStatus }] =
    useChangeCompanyStatusMutation();

  const companies = companyResponse?.data?.data || [];
  const totalItems = companyResponse?.data?.meta?.total || 0;

  // Map API data to table structure
  const companyData: TCompanyData[] = companies.map(
    (company: TCompanyData) => ({
      ...company,
      is_blocked: company.is_blocked || false, // Fallback to false
    })
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleViewDetails = (company: TCompanyData) => {
    setSelectedCompany(company);
  };

  const handleBlockUser = (id: string) => {
    handleMutation(id, changeCompanyStatus, "Changing status...");
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  useEffect(() => {
    console.log("Debounced search text:", debouncedSearchText);
  }, [debouncedSearchText]);

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  return (
    <div className="space-y-6 bg-card p-6 px-8 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Company List
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground h-4 w-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 border-border"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <AFilterSelect
            className="!w-[120px]"
            onChange={handleStatusChange}
            placeholder="Status"
            value={statusFilter}
            options={statusOptions}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="bg-primary px-4 py-3">
          <div className="grid grid-cols-12 gap-2 items-center text-card">
            <div className="col-span-4 font-semibold">Company</div>
            <div className="col-span-4 font-semibold">Email</div>
            <div className="col-span-2 font-semibold">Date</div>
            <div className="col-span-1 font-semibold">Status</div>
            <div className="col-span-1 font-semibold text-right">Actions</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border">
          {companyData.length > 0 ? (
            companyData.map((company) => (
              <div
                key={company._id}
                className="px-4 py-3 hover:bg-accent transition-colors rounded"
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* Company Column */}
                  <div className="col-span-4 flex items-center gap-2">
                    <div
                      className="w-6 h-6 bg-cover bg-center bg-no-repeat rounded-full"
                      style={{
                        backgroundImage: `url(${
                          company.user?.logo || defaultImg
                        })`,
                      }}
                    ></div>
                    <span className="text-primary-foreground truncate">
                      {company.user?.company_name || "N/A"}
                    </span>
                  </div>

                  {/* Email Column */}
                  <div className="col-span-4">
                    <span className="text-primary-foreground truncate">
                      {company.email || "N/A"}
                    </span>
                  </div>

                  {/* Date Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground truncate">
                      {company.createdAt
                        ? new Date(company.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-1">
                    <span
                      className={`text-primary-foreground ${
                        !company.is_blocked ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {company.is_blocked ? "Blocked" : "Active"}
                    </span>
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <Button
                      onClick={() => handleViewDetails(company)}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-border hover:bg-card"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {company.is_blocked ? (
                      <AAlertDialog
                        title="Unblock the company?"
                        onAction={() => handleBlockUser(company._id)}
                      >
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 text-white"
                          disabled={isChangingStatus}
                        >
                          <Unlock />
                        </Button>
                      </AAlertDialog>
                    ) : (
                      <AAlertDialog
                        title="Block the company?"
                        onAction={() => handleBlockUser(company._id)}
                      >
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full bg-destructive/90 hover:bg-destructive text-white"
                          disabled={isChangingStatus}
                        >
                          <Lock />
                        </Button>
                      </AAlertDialog>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-44 text-center text-muted-foreground">
              No companies found.
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && totalItems > limit && (
          <div className="p-4 flex">
            <APagination
              totalItems={totalItems}
              itemsPerPage={limit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxVisiblePages={5}
            />
          </div>
        )}
      </div>

      <UserDetailsModal
        isOpen={selectedCompany !== null}
        data={selectedCompany}
        onClose={closeModal}
      />
    </div>
  );
};

export default CompanyListTable;
