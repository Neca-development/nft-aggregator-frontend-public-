import { useCallback } from "react";

import { FREE_FAVORITES_SIZE } from "@constants/constant";
import {
  useAddToFavoriteMutation,
  useGetUserFavoritesQuery,
  useRemoveFromFavoriteMutation,
} from "@services/users.api";
import { selectUserData } from "@store/state/userSlice";
import { useAppSelector } from "@store/store.hook";

export enum FavoriteFunctionStatus {
  success = "success",
  error = "error",
  limit = "limit",
}

const useFavorite = (itemId: string) => {
  const { active, isLoggedIn } = useAppSelector(selectUserData);
  const [putToFavorites] = useAddToFavoriteMutation();
  const [deleteFromFavorites] = useRemoveFromFavoriteMutation();
  const { data: userFavorites } = useGetUserFavoritesQuery({ page: 0 }, { skip: !isLoggedIn });

  const getFavFromLs = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      return [];
    } else {
      return favorites;
    }
  }, []);

  const lsAddToFav = () => {
    const favorites = getFavFromLs();
    if (favorites.length >= FREE_FAVORITES_SIZE) {
      return FavoriteFunctionStatus.limit;
    }
    favorites.push(itemId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    return FavoriteFunctionStatus.success;
  };

  const lsRemoveFromFav = () => {
    const favorites = getFavFromLs();
    const fIdx = favorites.findIndex((el: string) => el === itemId);
    if (fIdx >= 0) {
      favorites.splice(fIdx, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      window.dispatchEvent(new Event("storage"));
      return FavoriteFunctionStatus.success;
    }
  };

  const serverAddToFav = async () => {
    if (active === false && userFavorites.items.length >= FREE_FAVORITES_SIZE) {
      return FavoriteFunctionStatus.limit;
    }
    const response = await putToFavorites(itemId).unwrap();
    if (response.status !== 200) {
      return FavoriteFunctionStatus.error;
    } else {
      return FavoriteFunctionStatus.success;
    }
  };

  const serverRemoveFromFav = async () => {
    const response = await deleteFromFavorites(itemId).unwrap();
    if (response.status !== 200) {
      return FavoriteFunctionStatus.error;
    } else {
      return FavoriteFunctionStatus.success;
    }
  };

  const addToFavorite = () => {
    if (isLoggedIn) {
      return serverAddToFav();
    } else {
      return lsAddToFav();
    }
  };

  const removeFromFavorite = () => {
    if (isLoggedIn) {
      return serverRemoveFromFav();
    } else {
      return lsRemoveFromFav();
    }
  };

  return { addToFavorite, removeFromFavorite, getFavFromLs };
};

export default useFavorite;
