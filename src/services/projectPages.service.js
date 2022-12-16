import { apiSlice } from "../store/index.service";

export const projectPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProjectPage: builder.query({
      query: () => ({
        url: "/projectPageElement",
        method: "GET",
      }),
    }),
    fetchFeedbackPage: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
    }),
    createFeddback: builder.mutation({
      query: (body) => ({
        url: "/review",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useFetchProjectPageQuery,
  useFetchFeedbackPageQuery,
  useCreateFeddbackMutation,
} = projectPageService;
