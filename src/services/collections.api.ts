import { ICollection, ICollectionRequest } from "@models/collection";
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
    getCollectionById: builder.query<ICollection, string>({
      query: collectionId => `collections/${collectionId}`,
      transformResponse: (response: IBaseResponse) => response.data,
    }),
  }),
});

export const {
  useGetCollectionsMutation,
  useGetCollectionByIdQuery,
  useLazyGetCollectionByIdQuery,
} = collectionsApi;
