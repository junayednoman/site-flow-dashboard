"use client";

import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

// Define the props interface
interface NotificationCardProps {
  title: string;
  message: string;
  timestamp: string;
  seen: boolean;
  onView?: () => void;
  onDelete?: () => void;
}

const NotificationCard = ({
  title,
  message,
  timestamp,
  onView,
  seen,
  onDelete,
}: NotificationCardProps) => {
  return (
    <div className="p-4 px-6 bg-card rounded-xl w-[50%]">
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
          <Button size="icon" onClick={onView}>
            <Eye className="w-4 h-4 text-accent" />
          </Button>
          <Button
            className="bg-destructive hover:bg-destructive/80"
            size="icon"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4 text-accent" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
