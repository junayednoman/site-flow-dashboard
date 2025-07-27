"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { Input } from "@/components/ui/input";
import { AFilterSelect } from "@/components/form/AFilterSelect";

// Dummy data for Earning Overview
const earningData = [
  {
    id: 1,
    serial: "01",
    companyName: "BuildForge",
    expireDate: "May 10, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 2,
    serial: "02",
    companyName: "NexStructure",
    expireDate: "May 10, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 3,
    serial: "03",
    companyName: "UrbanAix",
    expireDate: "May 10, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 4,
    serial: "04",
    companyName: "NexStructure",
    expireDate: "May 10, 2025",
    subscriptionType: "Basic Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 5,
    serial: "05",
    companyName: "Heritage Builders",
    expireDate: "May 10, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 6,
    serial: "06",
    companyName: "BuildForge",
    expireDate: "May 10, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 7,
    serial: "07",
    companyName: "Stone & Beam",
    expireDate: "May 10, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 8,
    serial: "08",
    companyName: "Atlas Construction",
    expireDate: "May 10, 2025",
    subscriptionType: "Basic Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 9,
    serial: "09",
    companyName: "Pinnacle Construction Co.",
    expireDate: "May 10, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "May 10, 2025",
  },
  {
    id: 10,
    serial: "10",
    companyName: "TechNova",
    expireDate: "June 15, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "June 15, 2025",
  },
  {
    id: 11,
    serial: "11",
    companyName: "InnoPeak",
    expireDate: "July 1, 2025",
    subscriptionType: "Basic Plan",
    purchaseDate: "July 1, 2025",
  },
  {
    id: 12,
    serial: "12",
    companyName: "SkyRise Solutions",
    expireDate: "April 20, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "April 20, 2025",
  },
  {
    id: 13,
    serial: "13",
    companyName: "GreenTech",
    expireDate: "August 10, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "August 10, 2025",
  },
  {
    id: 14,
    serial: "14",
    companyName: "CoreMatrix",
    expireDate: "March 5, 2025",
    subscriptionType: "Basic Plan",
    purchaseDate: "March 5, 2025",
  },
  {
    id: 15,
    serial: "15",
    companyName: "BlueHorizon",
    expireDate: "September 30, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "September 30, 2025",
  },
  {
    id: 16,
    serial: "16",
    companyName: "PeakPulse",
    expireDate: "June 25, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "June 25, 2025",
  },
  {
    id: 17,
    serial: "17",
    companyName: "SwiftWave",
    expireDate: "May 18, 2025",
    subscriptionType: "Basic Plan",
    purchaseDate: "May 18, 2025",
  },
  {
    id: 18,
    serial: "18",
    companyName: "ZenithCorp",
    expireDate: "July 12, 2025",
    subscriptionType: "Pro Plan",
    purchaseDate: "July 12, 2025",
  },
  {
    id: 19,
    serial: "19",
    companyName: "AeroDyne",
    expireDate: "April 8, 2025",
    subscriptionType: "Premium Plan",
    purchaseDate: "April 8, 2025",
  },
  {
    id: 20,
    serial: "20",
    companyName: "FusionTech",
    expireDate: "October 5, 2025",
    subscriptionType: "Basic Plan",
    purchaseDate: "October 5, 2025",
  },
];

const subscriptionTypeOptions = [
  { value: "all", label: "All" },
  ...Array.from(
    new Set(earningData.map((earning) => earning.subscriptionType))
  ).map((type) => ({
    value: type,
    label: type,
  })),
];

const EarningOverviewTable = ({
  pagination = false,
  limit = 10,
}: {
  pagination?: boolean;
  limit?: number;
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriptionFilter, setSubscriptionFilter] = useState<string>("all");

  // Filter earnings based on debounced search text and subscription type filter
  const filteredEarnings = earningData.filter(
    (earning) =>
      earning.companyName
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase()) &&
      (subscriptionFilter === "all" ||
        earning.subscriptionType === subscriptionFilter)
  );

  // Calculate paginated earnings based on limit
  const totalItems = filteredEarnings.length;
  const startIndex = (currentPage - 1) * limit;
  const paginatedEarnings = filteredEarnings.slice(
    startIndex,
    startIndex + limit
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSubscriptionChange = (value: string) => {
    setSubscriptionFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    console.log("Debounced search text:", debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <div className="space-y-6 bg-card p-6 px-8 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-foreground">
          Subscription Earning
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
          <div className="relative">
            <AFilterSelect
              value={subscriptionFilter}
              onChange={handleSubscriptionChange}
              className="w-[100px]"
              placeholder="Type"
              options={subscriptionTypeOptions}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="bg-primary px-4 py-4">
          <div className="grid grid-cols-12 gap-4 items-center text-card">
            <div className="col-span-1 font-semibold">Serial</div>
            <div className="col-span-3 font-semibold">Company Name</div>
            <div className="col-span-3 font-semibold">Expire Date</div>
            <div className="col-span-3 font-semibold">Subscription Type</div>
            <div className="col-span-2 font-semibold">Purchase Date</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border">
          {paginatedEarnings.length > 0 ? (
            paginatedEarnings.map((earning) => (
              <div
                key={earning.id}
                className="px-4 py-4 hover:bg-accent transition-colors rounded"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Serial Column */}
                  <div className="col-span-1">
                    <span className="text-primary-foreground">
                      {earning.serial}
                    </span>
                  </div>

                  {/* Company Name Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate font-semibold">
                      {earning.companyName}
                    </span>
                  </div>

                  {/* Expire Date Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground">
                      {new Date(earning.expireDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {/* Subscription Type Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate">
                      {earning.subscriptionType}
                    </span>
                  </div>

                  {/* Purchase Date Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground">
                      {new Date(earning.purchaseDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-44 text-center text-muted-foreground">
              No earnings found.
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
    </div>
  );
};

export default EarningOverviewTable;
