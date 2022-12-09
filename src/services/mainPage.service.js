import { apiSlice } from "../store/index.service";

export const mainPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMainPage: builder.query({
      query: () => ({
        url: "/mainPageElement",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchMainPageQuery } = mainPageService;
