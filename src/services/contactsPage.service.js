import { apiSlice } from "../store/index.service";

export const contactsPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchContactsPage: builder.query({
      query: () => ({
        url: "/contactPage",
        method: "GET",
      }),
    }),
  }),
});

export const { useFetchContactsPageQuery } = contactsPageService;
