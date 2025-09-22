"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { defaultImg } from "@/data/global.data";
import { TCompanyData } from "@/interface/company.interface";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: TCompanyData | null;
}

export function UserDetailsModal({
  isOpen,
  onClose,
  data,
}: UserDetailsModalProps) {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-card border-border p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-primary-foreground">
            Company Details
          </DialogTitle>
          <DialogDescription className="sr-only">
            Company details modal
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <div
            className="w-32 h-32 bg-cover bg-center bg-no-repeat rounded-full"
            style={{
              backgroundImage: `url(${data.user?.logo || defaultImg})`,
            }}
          ></div>
          <div className="w-full space-y-2 mt-3">
            <h4 className="text-lg font-semibold text-primary-foreground">
              Company Details
            </h4>
            <div>
              <p className="text-sm text-foreground py-3">
                Company Name: {data.user?.company_name || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Email: {data.email || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Admin Name: {data.user?.name || "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Status: {data.is_blocked ? "Blocked" : "Active"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Created At:{" "}
                {data.createdAt
                  ? new Date(data.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
              <p className="text-sm text-foreground border-t py-3">
                Updated At:
                {data.updatedAt
                  ? new Date(data.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
