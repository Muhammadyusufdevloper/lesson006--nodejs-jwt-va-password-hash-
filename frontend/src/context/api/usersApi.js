import { api } from './index'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        url: '/users',
        params
      }),
      providesTags: ["User", "Admin"]
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/users/${id}`
      }),
      providesTags: ["User"]
    }),
    createUser: build.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body
      }),
      invalidatesTags: ["User"]
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["User"]
    }),
    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["User"]
    })
  }),
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation
} = userApi
