import { baseApi } from "./baseApi";

const subscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: "/subscription-plans",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["plans"]
    }),
    getSubscriptionPlans: builder.query({
      query: (params) => ({
        url: "/subscription-plans",
        method: "GET",
        params
      }),
      providesTags: ["plans"]
    }),
    updateSubscriptionPlan: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/subscription-plans/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ["plans"]
    })
  }),
})

export const { useCreateSubscriptionPlanMutation, useGetSubscriptionPlansQuery, useUpdateSubscriptionPlanMutation } = subscriptionPlanApi;