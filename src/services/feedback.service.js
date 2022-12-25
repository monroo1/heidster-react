import { apiSlice } from "../store/index.service";

export const feedbackService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFeedback: builder.mutation({
      query: (credentials) => ({
        url: "/feedback",
        method: "POST",
        body: credentials,
      }),
    }),
    getFeedbacks: builder.query({
      query: () => ({
        url: "/feedback",
        method: "GET",
      }),
    }),
    updateFeedback: builder.mutation({
      query: ({ id, body }) => ({
        url: `/feedback/${id}`,
        method: "PATCH",
        body: body,
      }),
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFeedbackMutation,
  useGetFeedbacksQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackService;
