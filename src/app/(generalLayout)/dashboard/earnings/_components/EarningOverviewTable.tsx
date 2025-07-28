"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { APagination } from "@/components/ui/APagination";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetPaymentsQuery } from "@/redux/api/paymentApi";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import { PaymentDetailsModal } from "./PaymentDetailsModal";

const EarningOverviewTable = () => {
  const [limit, setLimit] = useState(10);
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

  const {
    data: paymentResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPaymentsQuery({
    limit,
    page: currentPage,
    searchTerm: debouncedSearchText || undefined,
  });

  const payments = paymentResponse?.data?.data || [];

  const totalItems = paymentResponse?.data?.meta?.total || 0;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (searchText) {
      console.log("searchText", searchText);
      setLimit(1000);
    }
    setSearchText(event.target.value);
    // setCurrentPage(1); // Reset to first page on new search
  };

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
  };

  const closeModal = () => {
    setSelectedPayment(null);
  };

  useEffect(() => {
    if (debouncedSearchText) {
      setLimit(1000);
    } else {
      setLimit(9);
    }
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
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="bg-primary px-4 py-4">
          <div className="grid grid-cols-12 gap-4 items-center text-card">
            <div className="col-span-1 font-semibold">Serial</div>
            <div className="col-span-3 font-semibold">Company Name</div>
            <div className="col-span-2 font-semibold">Email</div>
            <div className="col-span-2 font-semibold">Amount</div>
            <div className="col-span-3 font-semibold">Payment Date</div>
            <div className="col-span-1 font-semibold text-right">Actions</div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-border">
          {payments.length > 0 ? (
            payments.map((payment: any, index: number) => (
              <div
                key={payment._id}
                className="px-4 py-4 hover:bg-accent transition-colors rounded"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Serial Column */}
                  <div className="col-span-1">
                    <span className="text-primary-foreground">
                      {(currentPage - 1) * limit + index + 1}
                    </span>
                  </div>

                  {/* Company Name Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground truncate font-semibold">
                      {payment.companyAdmin?.company_name || "N/A"}
                    </span>
                  </div>

                  {/* Email Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground truncate">
                      {payment.companyAdmin?.email || "N/A"}
                    </span>
                  </div>

                  {/* Amount Column */}
                  <div className="col-span-2">
                    <span className="text-primary-foreground">
                      ${payment.amount || 0}
                    </span>
                  </div>

                  {/* Payment Date with Time Column */}
                  <div className="col-span-3">
                    <span className="text-primary-foreground">
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "N/A"}
                    </span>
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-1 flex items-center justify-end">
                    <Button
                      onClick={() => handleViewDetails(payment)}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-border hover:bg-card"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
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
        {totalItems > limit && (
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

      <PaymentDetailsModal
        isOpen={selectedPayment !== null}
        data={selectedPayment}
        onClose={closeModal}
      />
    </div>
  );
};

export default EarningOverviewTable;
