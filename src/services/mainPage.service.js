import { apiSlice } from "../store/index.service";

export const mainPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMainPage: builder.query({
      query: () => ({
        url: "/mainPageElement",
        method: "GET",
      }),
    }),
    patchMainPageElement: builder.mutation({
      query: ({ id, body }) => ({
        url: `/mainPageElement/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const { useFetchMainPageQuery, usePatchMainPageElementMutation } =
  mainPageService;
