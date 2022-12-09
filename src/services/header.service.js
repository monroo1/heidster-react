import { apiSlice } from "../store/index.service";

export const headerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchHeader: builder.query({
      query: () => ({
        url: "/headerElement",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchHeaderQuery } = headerService;
