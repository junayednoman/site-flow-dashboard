import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotifications: builder.query({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params
      }),
      providesTags: ["notification"]
    }),
    getUnreadNotificationCount: builder.query({
      query: () => ({
        url: "/notifications/unread-count",
        method: "GET",
      }),
      providesTags: ["notification"]
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notifications/mark-all-as-read",
        method: "PATCH",
      }),
      invalidatesTags: ["notification"]
    }),
    deleteSingleNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"]
    }),
    deleteMyNotifications: builder.mutation({
      query: () => ({
        url: "/notifications",
        method: "DELETE",
      }),
      invalidatesTags: ["notification"]
    })
  }),
})

export const { useGetMyNotificationsQuery, useGetUnreadNotificationCountQuery, useMarkAllAsReadMutation, useDeleteSingleNotificationMutation, useDeleteMyNotificationsMutation } = notificationApi;