import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateSettings: builder.mutation({
      query: (payload) => {
        return {
          url: "/settings",
          method: "PUT",
          body: payload
        }
      },
      invalidatesTags: ["settings"]
    }),
    getSettingsContent: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["settings"]
    })
  }),
})

export const { useUpdateSettingsMutation, useGetSettingsContentQuery } = settingsApi;