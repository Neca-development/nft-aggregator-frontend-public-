import {
  IDiscordMessagesResponse,
  IMessagesRequest,
  ITwitterMessagesResponse,
} from "@models/messages.interface";
import { IBaseResponse } from "@models/response.interface";

import { baseApi } from "./base.api";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDiscord: builder.query<IDiscordMessagesResponse, IMessagesRequest>({
      query: ({ collectionId, page, perPage = 10 }) =>
        `messages/discord/${collectionId}?page=${page}&perPage=${perPage}`,
      transformResponse: (response: IBaseResponse) => response.data,
    }),

    getTwitter: builder.query<ITwitterMessagesResponse, IMessagesRequest>({
      query: ({ collectionId, page, perPage = 10 }) =>
        `messages/twitter/${collectionId}?page=${page}&perPage=${perPage}`,
      transformResponse: (response: IBaseResponse) => response.data,
    }),

    markDiscord: builder.mutation<IBaseResponse, string>({
      query: collectionId => ({
        url: `messages/discord/${collectionId}/read`,
        method: "PUT",
      }),
    }),

    markTwitter: builder.mutation<IBaseResponse, string>({
      query: collectionId => ({
        url: `messages/twitter/${collectionId}/read`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useLazyGetDiscordQuery,
  useLazyGetTwitterQuery,
  useMarkDiscordMutation,
  useMarkTwitterMutation,
} = messagesApi;
