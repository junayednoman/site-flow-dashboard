import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (params) => ({
        url: "/payments",
        method: "GET",
        params
      }),
      providesTags: ["companyAdmin"]
    }),
  }),
})

export const { useGetPaymentsQuery } = paymentApi;