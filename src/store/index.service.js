import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const API_URL = "https://c2421a7ec6e9f8.lhr.life";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL + "/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
