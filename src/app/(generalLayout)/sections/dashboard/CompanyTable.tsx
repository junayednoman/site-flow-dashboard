"use client";

import { Button } from "@/components/ui/button";
import { Eye, Lock, Search, Unlock } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Input } from "@/components/ui/input";
import { UserDetailsModal } from "@/components/modal/UserDetailsModal";
import { AFilterSelect } from "@/components/form/AFilterSelect";

const companyData = [
  {
    id: 1,
    name: "BuildForge",
    plan: "Pro Plan",
    renewalDate: "May 10, 2025",
    status: "Active",
  },
  {
    id: 2,
    name: "NexStructure",
    plan: "Premium Plan",
    renewalDate: "May 10, 2025",
    status: "Blocked",
  },
  {
    id: 3,
    name: "UrbanAix",
    plan: "Pro Plan",
    renewalDate: "May 10, 2025",
    status: "Active",
  },
  {
    id: 4,
    name: "NexStructure",
    plan: "Basic Plan",
    renewalDate: "May 10, 2025",
    status: "Blocked",
  },
  {
    id: 5,
    name: "TechNova",
    plan: "Premium Plan",
    renewalDate: "June 15, 2025",
    status: "Active",
  },
  {
    id: 6,
    name: "InnoPeak",
    plan: "Basic Plan",
    renewalDate: "July 1, 2025",
    status: "Blocked",
  },
  {
    id: 7,
    name: "SkyRise Solutions",
    plan: "Pro Plan",
    renewalDate: "April 20, 2025",
    status: "Active",
  },
  {
    id: 8,
    name: "GreenTech",
    plan: "Premium Plan",
    renewalDate: "August 10, 2025",
    status: "Blocked",
  },
  {
    id: 9,
    name: "CoreMatrix",
    plan: "Basic Plan",
    renewalDate: "March 5, 2025",
    status: "Active",
  },
  {
    id: 10,
    name: "BlueHorizon",
    plan: "Pro Plan",
    renewalDate: "September 30, 2025",
    status: "Active",
  },
  {
    id: 11,
    name: "PeakPulse",
    plan: "Premium Plan",
    renewalDate: "June 25, 2025",
    status: "Blocked",
  },
  {
    id: 12,
    name: "SwiftWave",
    plan: "Basic Plan",
    renewalDate: "May 18, 2025",
    status: "Active",
  },
  {
    id: 13,
    name: "ZenithCorp",
    plan: "Pro Plan",
    renewalDate: "July 12, 2025",
    status: "Blocked",
  },
  {
    id: 14,
    name: "AeroDyne",
    plan: "Premium Plan",
    renewalDate: "April 8, 2025",
    status: "Active",
  },
  {
    id: 15,
    name: "FusionTech",
    plan: "Basic Plan",
    renewalDate: "October 5, 2025",
    status: "Blocked",
  },
  {
    id: 16,
    name: "NovaLink",
    plan: "Pro Plan",
    renewalDate: "June 20, 2025",
    status: "Active",
  },
  {
    id: 17,
    name: "BrightPath",
    plan: "Premium Plan",
    renewalDate: "August 15, 2025",
    status: "Blocked",
  },
  {
    id: 18,
    name: "ClearSky",
    plan: "Basic Plan",
    renewalDate: "May 25, 2025",
    status: "Active",
  },
  {
    id: 19,
    name: "TerraFirm",
    plan: "Pro Plan",
    renewalDate: "September 10, 2025",
    status: "Active",
  },
  {
    id: 20,
    name: "QuantumEdge",
    plan: "Premium Plan",
    renewalDate: "July 30, 2025",
    status: "Blocked",
  },
];

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
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  // Filter companies based on debounced search text and status filter
  const filteredCompanies = companyData.filter(
    (company) =>
      company.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) &&
      (statusFilter === "all" ||
        company.status.toLowerCase() === statusFilter.toLowerCase())
  );

  // Calculate paginated companies based on limit
  const totalItems = filteredCompanies.length;
  const startIndex = (currentPage - 1) * limit;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + limit
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  useEffect(() => {
    console.log("Debounced search text:", debouncedSearchText);
  }, [debouncedSearchText]);

  const handleBlockUser = (id: number) => {
    console.log("Block User:", id);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleViewDetails = (id: number) => {
    setSelectedCompany(id);
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

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
            <div className="col-span-3 font-semibold">Company Name</div>
            <div className="col-span-3 font-semibold">Subscription Plan</div>
            <div className="col-span-2 font-semibold">Renewal Date</div>
            <div className="col-span-2 font-semibold">Status</div>
            <div className="col-span-2 font-semibold text-right">Action</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border">
          {paginatedCompanies.length > 0 ? (
            paginatedCompanies.map((company) => (
              <div
                key={company.id}
                className="px-4 py-3 hover:bg-accent transition-colors rounded"
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* Company Name Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate">
                      {company.name}
                    </span>
                  </div>

                  {/* Subscription Plan Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate">
                      {company.plan}
                    </span>
                  </div>

                  {/* Renewal Date Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground">
                      {new Date(company.renewalDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {/* Status Column */}
                  <div className="col-span-2">
                    <span
                      className={`text-primary-foreground ${
                        company.status.toLowerCase() === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {company.status}
                    </span>
                  </div>

                  {/* Action Column */}
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <Button
                      onClick={() => handleViewDetails(company.id)}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-border hover:bg-card"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {company.status.toLowerCase() === "active" ? (
                      <AAlertDialog
                        title="Block the user!"
                        onAction={() => handleBlockUser(company.id)}
                        // Use children instead of trigger if that's the expected prop
                      >
                        <Button
                          size="icon"
                          className="h-8 w-8 rounded-full bg-destructive/90 hover:bg-destructive text-white"
                        >
                          <Lock />
                        </Button>
                      </AAlertDialog>
                    ) : (
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Unlock />
                      </Button>
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
        <UserDetailsModal
          isOpen={selectedCompany !== null}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default CompanyListTable;
