import { apiSlice } from "../store/index.service";

export const contactsPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchContactsPage: builder.query({
      query: () => ({
        url: "/contactPage",
        method: "GET",
      }),
    }),
    patchContactsPage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/contactPage/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
  }),
});

export const { useFetchContactsPageQuery, usePatchContactsPageMutation } =
  contactsPageService;
