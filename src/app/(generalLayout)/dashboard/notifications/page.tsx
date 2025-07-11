"use client";

import { notifications } from "@/data/notification.data";
import NotificationCard from "./NotificationCard";

const Notifications = () => {
  const handleView = (index: number) => {
    console.log(`Viewed notification ${index}`);
  };

  const handleDelete = (index: number) => {
    console.log(`Deleted notification ${index}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold text-primary-foreground">
        Notifications
      </h1>
      <div className="space-y-4 mt-6">
        {notifications.map((notification, index) => (
          <NotificationCard
            seen={index % 2 === 0}
            key={notification.id}
            title={notification.title}
            message={notification.message}
            timestamp={notification.timestamp}
            onView={() => handleView(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
