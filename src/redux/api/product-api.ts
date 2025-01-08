import { api } from "./index";

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/products",
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery } = productApi;
