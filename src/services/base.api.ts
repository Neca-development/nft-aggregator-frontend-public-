import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${serverUrl}/api`,
    prepareHeaders: headers => {
      const agAuth = JSON.parse(localStorage.getItem("agAuth"));

      if (!agAuth) {
        return headers;
      }

      headers.set("timestamp", agAuth.timestamp);
      headers.set("signature", agAuth.signature);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
