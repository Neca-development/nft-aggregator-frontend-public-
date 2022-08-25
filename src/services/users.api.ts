import { IFavoritesResponse } from "@models/favorite";
import { IBaseResponse } from "@models/response.interface";

import { baseApi } from "./base.api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserFavorites: builder.query<IFavoritesResponse, { page: number; perPage?: number }>({
      query: ({ page, perPage = 9 }) =>
        `users/favorites/collections?page=${page}&perPage=${perPage}`,
      transformResponse: (response: IBaseResponse) => response.data,
      providesTags: ["Favorites"],
    }),
    addToFavorite: builder.mutation<IBaseResponse, string>({
      query: collectionId => ({
        url: `users/favorites/collections/${collectionId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Favorites"],
    }),
    removeFromFavorite: builder.mutation<IBaseResponse, string>({
      query: collectionId => ({
        url: `users/favorites/collections/${collectionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const { useGetUserFavoritesQuery, useAddToFavoriteMutation, useRemoveFromFavoriteMutation } =
  usersApi;
