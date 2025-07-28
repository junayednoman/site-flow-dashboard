import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string, is_remember?: boolean }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"]
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST"
      }),
      invalidatesTags: ["auth"]
    }),
    forgotPassword: builder.mutation({
      query: (credentials: { email: string }) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"]
    }),
    verifyOtp: builder.mutation({
      query: (payload: { otp: string; email: string }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    resetForgottenPassword: builder.mutation({
      query: (payload: { password: string; token: string }) => ({
        url: "/auth/reset-forgotten-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    }),
    changePassword: builder.mutation({
      query: (payload: { old_password: string; new_password: string }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"]
    })
  }),
})

export const { useLoginMutation, useLogoutMutation, useForgotPasswordMutation, useVerifyOtpMutation, useResetForgottenPasswordMutation, useChangePasswordMutation } = authApi;