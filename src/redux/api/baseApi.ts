
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { logOut, setUser } from '../slice/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const constructionAccessToken = Cookies.get("constructionAccessToken");

    // If user have a token set it in the state
    if (constructionAccessToken) {
      headers.set("authorization", `Bearer ${constructionAccessToken}`);
    }
    return headers;
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // retrieve new token
  if (result?.error?.status === 401) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    }).then(res => res.json());

    if (res?.data?.constructionAccessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: res.data.constructionAccessToken,
        }),
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["auth", "profile", "summary", "leaderboard", "banner", "companyAdmin", "plans", "notification", "settings", "user"],
  endpoints: () => ({})
})