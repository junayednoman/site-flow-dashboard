"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { defaultImg } from "@/data/global.data";

interface PaymentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

export function PaymentDetailsModal({
  isOpen,
  onClose,
  data,
}: PaymentDetailsModalProps) {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary-foreground">
            Payment Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            Payment details modal
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <div
            className="w-32 h-32 bg-cover bg-center bg-no-repeat rounded-full"
            style={{
              backgroundImage: `url(${data.companyAdmin?.image || defaultImg})`,
            }}
          >
            {" "}
          </div>
          <div className="w-full space-y-2 mt-3">
            <h4 className="text-lg font-semibold text-primary-foreground">
              Payment Details
            </h4>
            <div>
              <p className="text-sm text-foreground border-t py-3">
                Company Name: {data.companyAdmin?.company_name || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Company Email: {data.companyAdmin?.email || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Amount: ${data.amount || 0}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Payment Date:{" "}
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Transaction ID: {data.transaction_id || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
