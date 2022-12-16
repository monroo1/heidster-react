import { apiSlice } from "../store/index.service";

export const fileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    downloadFile: builder.mutation({
      query: (credentials) => ({
        url: "/loadFile",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useDownloadFileMutation } = fileService;
