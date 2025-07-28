"use client";
import {
  useGetMyNotificationsQuery,
  useMarkAllAsReadMutation,
  useDeleteMyNotificationsMutation,
} from "@/redux/api/notificationApi";
import NotificationCard from "./NotificationCard";
import ASpinner from "@/components/ui/ASpinner";
import AErrorMessage from "@/components/AErrorMessage";
import handleMutation from "@/utils/handleMutation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NotificationContainer = () => {
  const [limit, setLimit] = useState(5);
  const {
    data: notificationResponse,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetMyNotificationsQuery({ limit });
  const [markAllAsRead, { isLoading: isMarkingAllAsRead }] =
    useMarkAllAsReadMutation();
  const [deleteMyNotifications, { isLoading: isDeletingAll }] =
    useDeleteMyNotificationsMutation();

  const handleMarkAllAsRead = () => {
    handleMutation({}, markAllAsRead, "Marking all as read...");
  };

  const handleDeleteAll = () => {
    handleMutation({}, deleteMyNotifications, "Deleting all notifications...");
  };

  const handleShowMore = () => {
    setLimit(limit + 5);
  };
  const handleShowLess = () => {
    setLimit(5);
  };

  if (isLoading) return <ASpinner size={150} className="py-64" />;
  if (isError)
    return <AErrorMessage error={error} onRetry={refetch} className="py-64" />;

  const notifications = notificationResponse?.data?.data || [];
  const meta = notificationResponse?.data?.meta || false;

  return (
    <div
      className={`min-h-screen bg-background p-6 ${
        notifications.length !== 0 && "w-1/2"
      }`}
    >
      {notifications.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary-foreground">
              Notifications
            </h1>
            <div className="space-x-2">
              <Button
                disabled={isMarkingAllAsRead}
                onClick={handleMarkAllAsRead}
                className="bg-primary/80 hover:bg-primary"
              >
                {isMarkingAllAsRead ? "Marking..." : "Mark All as Read"}
              </Button>
              <Button
                disabled={isDeletingAll}
                onClick={handleDeleteAll}
                className="bg-destructive/80 hover:bg-destructive"
              >
                {isDeletingAll ? "Deleting..." : "Delete All"}
              </Button>
            </div>
          </div>
          <div className="space-y-4 mt-6">
            {notifications.map((notification: any) => (
              <NotificationCard
                key={notification._id}
                id={notification._id}
                title={notification.title}
                message={notification.body}
                timestamp={new Date(notification.createdAt).toLocaleString()}
                seen={notification.has_read}
              />
            ))}
          </div>
          {meta.total > limit ? (
            <div className="text-center mt-7">
              <Button
                disabled={!isDeletingAll && !isMarkingAllAsRead && isFetching}
                onClick={handleShowMore}
                className="bg-primary/80 hover:bg-primary"
              >
                {!isDeletingAll && !isMarkingAllAsRead && isFetching
                  ? "Loading..."
                  : "Show More"}
              </Button>
            </div>
          ) : (
            <div className="text-center mt-7">
              <Button
                disabled={!isDeletingAll && !isMarkingAllAsRead && isFetching}
                onClick={handleShowLess}
                className="bg-primary/80 hover:bg-primary"
              >
                {!isDeletingAll && !isMarkingAllAsRead && isFetching
                  ? "Loading..."
                  : "Sow less"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-64 text-muted-foreground">
          No notifications available.
        </div>
      )}
    </div>
  );
};

export default NotificationContainer;
