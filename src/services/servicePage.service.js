import { apiSlice } from "../store/index.service";

export const projectPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchServicePage: builder.query({
      query: () => ({
        url: "/servicePageElement",
        method: "GET",
      }),
    }),
    patchServicePageElement: builder.mutation({
      query: ({ id, body }) => ({
        url: `/servicePageElement/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    createServiscePageElement: builder.mutation({
      query: (body) => ({
        url: `/servicePageElement`,
        method: "POST",
        body: body,
      }),
    }),
    deleteServiscePageElement: builder.mutation({
      query: (id) => ({
        url: `/servicePageElement/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchServicePageQuery,
  usePatchServicePageElementMutation,
  useCreateServiscePageElementMutation,
  useDeleteServiscePageElementMutation,
} = projectPageService;
