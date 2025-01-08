import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6764ec6a52b2a7619f5dd2ca.mockapi.io",
  }),
  endpoints: () => ({}),
  tagTypes: ["Cars", "Blogs", "Users"],
});
