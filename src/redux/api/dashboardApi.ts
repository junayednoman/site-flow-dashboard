import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query({
      query: () => ({
        url: "/summary/stats",
        method: "GET",
      }),
      providesTags: ["summary"]
    }),
    getEarningSummary: builder.query({
      query: (params) => ({
        url: "/summary/earning",
        method: "GET",
        params
      }),
      providesTags: ["summary"]
    }),
  }),
})

export const { useGetDashboardSummaryQuery, useGetEarningSummaryQuery } = dashboardApi;