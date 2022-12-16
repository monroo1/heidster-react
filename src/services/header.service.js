import { apiSlice } from "../store/index.service";

export const headerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchHeader: builder.query({
      query: () => ({
        url: "/headerElement",
        method: "GET",
      }),
    }),
    patchHeader: builder.mutation({
      query: ({ id, body }) => ({
        url: `/headerElement/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    patchMenuItem: builder.mutation({
      query: ({ id, name }) => ({
        url: `/menuElement/${id}`,
        method: "PATCH",
        body: {
          name,
        },
      }),
    }),
  }),
});

export const {
  useFetchHeaderQuery,
  usePatchHeaderMutation,
  usePatchMenuItemMutation,
} = headerService;
