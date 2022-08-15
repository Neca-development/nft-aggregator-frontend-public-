import { IFavorite } from "@models/favorite";
import { IBaseResponse } from "@models/response.interface";
import { baseApi } from "./base.api";

export const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserFavorites: builder.query<IFavorite[], { page: number; perPage?: number }>({
      query: ({ page, perPage = 9 }) =>
        `users/favorites/collections?page=${page}&perPage=${perPage}`,
      transformResponse: (response: IBaseResponse) => response.data,
    }),
    addToFavorite: builder.mutation<IBaseResponse, string>({
      query: collectionId => ({
        url: `users/favorites/collections/${collectionId}`,
        method: "PUT",
      }),
    }),
    removeFromFavorite: builder.mutation<IBaseResponse, string>({
      query: collectionId => ({
        url: `users/favorites/collections/${collectionId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetUserFavoritesQuery, useAddToFavoriteMutation, useRemoveFromFavoriteMutation } =
  usersApi;
