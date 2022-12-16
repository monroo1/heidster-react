import { apiSlice } from "../store/index.service";

export const projectPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchServicePage: builder.query({
      query: () => ({
        url: "/servicePageElement",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchServicePageQuery } = projectPageService;
