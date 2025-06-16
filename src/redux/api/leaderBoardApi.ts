import { baseApi } from "./baseApi";

const leaderBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: (params) => ({
        url: "/leaderboard/dashboard-data",
        method: "GET",
        params
      }),
      providesTags: ["leaderboard"]
    }),
  }),
})

export const { useGetLeaderboardQuery } = leaderBoardApi;