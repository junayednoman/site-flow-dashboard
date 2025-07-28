"use client";

import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useDeleteSingleNotificationMutation } from "@/redux/api/notificationApi";
import handleMutation from "@/utils/handleMutation";

// Define the props interface
interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  seen: boolean;
  onView?: () => void;
  onDelete?: (id: string) => void;
}

const NotificationCard = ({
  id,
  title,
  message,
  timestamp,
  seen,
}: NotificationCardProps) => {
  const [deleteSingleNotification, { isLoading }] =
    useDeleteSingleNotificationMutation();
  const handleDelete = () => {
    handleMutation(id, deleteSingleNotification, "Deleting notification...");
  };

  return (
    <div className="p-4 px-6 bg-card rounded-xl">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h6
            className={`${
              seen ? "font-medium" : "font-extrabold"
            } text-lg text-primary-foreground`}
          >
            {title}
          </h6>
          <p
            className={`text-primary-foreground m-1 -ml-[1px] ${
              seen ? "font-medium" : "font-bold"
            }`}
          >
            {message}
          </p>
          <p className="mt-4 text-sm text-card-foreground">{timestamp}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={isLoading}
            onClick={handleDelete}
            className="bg-destructive hover:bg-destructive/80"
            size="icon"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 text-accent animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 text-accent" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
