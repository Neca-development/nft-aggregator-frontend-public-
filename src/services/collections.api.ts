import { ICollectionRequest } from "@models/collection";
import { IBaseResponse } from "@models/response.interface";
import { baseApi } from "./base.api";

export const collectionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCollections: builder.mutation<IBaseResponse, ICollectionRequest>({
      query: ({ filter, page = 0, perPage = 20 }) => ({
        url: `collections?page=${page}&perPage=${perPage}`,
        method: "POST",
        body: filter,
      }),
    }),
  }),
});

export const { useGetCollectionsMutation } = collectionsApi;
