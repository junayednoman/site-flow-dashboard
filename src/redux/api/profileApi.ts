import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["profile"]
    }),
    updateAdminProfile: builder.mutation({
      query: (payload) => ({
        url: "/admins",
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["profile"]
    }),
    updateAdminImage: builder.mutation({
      query: (payload) => ({
        url: "/admins/image",
        method: "PATCH",
        body: payload
      }),
      invalidatesTags: ["profile"]
    })
  }),
})

export const { useGetProfileQuery, useUpdateAdminProfileMutation, useUpdateAdminImageMutation } = profileApi;