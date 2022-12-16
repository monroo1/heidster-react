import { apiSlice } from "../store/index.service";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth_admin",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    registration: builder.mutation({
      query: ({ secret, content }) => ({
        url: "/user",
        method: "POST",
        headers: {
          secret: secret,
        },
        body: { ...content },
      }),
    }),
    checkAuth: builder.mutation({
      query: () => ({
        url: "/user",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useCheckAuthMutation,
} = authService;
