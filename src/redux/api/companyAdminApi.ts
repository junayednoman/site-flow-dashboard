import { baseApi } from "./baseApi";

const companyAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyAdmins: builder.query({
      query: (params) => ({
        url: "/company-admins",
        method: "GET",
        params
      }),
      providesTags: ["companyAdmin"]
    }),
    changeCompanyStatus: builder.mutation({
      query: (id) => ({
        url: `/auth/change-status/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: ["companyAdmin"]
    }),
  }),
})

export const { useGetCompanyAdminsQuery, useChangeCompanyStatusMutation } = companyAdminApi;