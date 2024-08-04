import { api } from './index'

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => ({
        url: "/admins/sing-in",
        method: "POST",
        body
      }),
      invalidatesTags: ["Admin"]
    }),
    registerUser: build.mutation({
      query: (body) => ({
        url: "/admins/sing-up",
        method: "POST",
        body
      }),
      invalidatesTags: ["Admin"]
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useSignInMutation
} = adminApi