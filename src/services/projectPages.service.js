import { apiSlice } from "../store/index.service";

export const projectPageService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeedbackPage: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: "/review",
        method: "POST",
        body: body,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
    }),
    fetchProjectPage: builder.query({
      query: () => ({
        url: "/projectPageElement",
        method: "GET",
      }),
    }),
    patchProjectPage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/projectPageElement/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    createProjectPageElement: builder.mutation({
      query: (body) => ({
        url: `/projectPageElement`,
        method: "POST",
        body: body,
      }),
    }),
    deleteProjectPageElement: builder.mutation({
      query: (id) => ({
        url: `/projectPageElement/${id}`,
        method: "DELETE",
      }),
    }),
    createProject: builder.mutation({
      query: (body) => ({
        url: `/project`,
        method: "POST",
        body: body,
      }),
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchProjectPageQuery,
  useFetchFeedbackPageQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  usePatchProjectPageMutation,
  useCreateProjectPageElementMutation,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useDeleteProjectPageElementMutation,
} = projectPageService;
