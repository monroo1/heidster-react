import { apiSlice } from "../store/index.service";

export const footerService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFooter: builder.query({
      query: () => ({
        url: "/footerElement",
        method: "GET",
      }),
    }),
    patchFooterElement: builder.mutation({
      query: ({ id, body }) => ({
        url: `/footerElement/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const { useFetchFooterQuery, usePatchFooterElementMutation } =
  footerService;
