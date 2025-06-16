import { baseApi } from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBanner: builder.mutation({
      query: (data) => ({
        url: "/rewards",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["banner"]
    }),
    getBanners: builder.query({
      query: () => ({
        url: "/rewards",
        method: "GET",
      }),
      providesTags: ["banner"]
    }),
    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/rewards/${id}`,
        method: "GET",
      }),
      providesTags: ["banner"]
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `/rewards/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["banner"]
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/rewards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"]
    })
  }),
})

export const { useAddBannerMutation, useGetBannersQuery, useGetSingleBannerQuery, useUpdateBannerMutation, useDeleteBannerMutation } = bannerApi;