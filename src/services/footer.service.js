import { apiSlice } from "../store/index.service";

export const footerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFooter: builder.query({
      query: () => ({
        url: "/footerElement",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchFooterQuery } = footerService;
