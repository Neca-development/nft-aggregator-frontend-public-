import { ICollection, ICollectionRequest } from "@models/collection";
import { IGaaRequest } from "@models/gaa";
import { IBaseResponse } from "@models/response.interface";

import { baseApi } from "./base.api";

export const collectionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCollections: builder.mutation<IBaseResponse, ICollectionRequest>({
      query: ({ filter, page = 0, perPage = 10 }) => ({
        url: `collections?page=${page}&perPage=${perPage}`,
        method: "POST",
        body: filter,
      }),
    }),
    getCollectionById: builder.query<ICollection, string>({
      query: collectionId => `collections/${collectionId}`,
      transformResponse: (response: IBaseResponse) => response.data,
    }),
    getGiveawaysAndAnnouncements: builder.mutation<IBaseResponse, IGaaRequest>({
      query: ({ filter, type, page = 0, perPage = 10 }) => ({
        url: `collections/giveaways-and-announcements/${type}?page=${page}&perPage=${perPage}`,
        method: "POST",
        body: filter,
      }),
    }),
  }),
});

export const {
  useGetCollectionsMutation,
  useGetCollectionByIdQuery,
  useLazyGetCollectionByIdQuery,
  useGetGiveawaysAndAnnouncementsMutation,
} = collectionsApi;
