import { IUser } from "../../types";
import { api } from "./index";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<IUser[], any>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    deleteUser: build.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    createUser: build.mutation<IUser, Partial<IUser>>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
    }),
    editUser: build.mutation<
      IUser,
      { id: string; updatedUser: Partial<IUser> }
    >({
      query: ({ id, updatedUser }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useEditUserMutation,
} = userApi;
