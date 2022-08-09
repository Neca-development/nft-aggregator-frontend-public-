import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverUrl}/api`,
    prepareHeaders: headers => {
      // put metamask signature here
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
