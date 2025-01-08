import { IBlog } from "../../types";
import { api } from "./index";

const blogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<IBlog[], any>({
      query: () => "/blogs",
      providesTags: ["Blogs"],
    }),
    deleteBlog: build.mutation<IBlog, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBlogsQuery, useDeleteBlogMutation } = blogApi;
