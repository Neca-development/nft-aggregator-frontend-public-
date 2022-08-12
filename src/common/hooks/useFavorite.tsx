import { selectUserData } from "@store/state/userSlice";
import { useAppSelector } from "@store/store.hook";
import { useCallback } from "react";

const useFavorite = (itemId: number | string) => {
  const { wallet } = useAppSelector(selectUserData);

  const getFavFromLs = useCallback(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (!favorites) {
      return [];
    } else {
      return favorites;
    }
  }, []);

  const lsAddToFav = () => {
    let favorites = getFavFromLs();
    favorites.push(itemId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const lsRemoveFromFav = () => {
    let favorites = getFavFromLs();
    const fIdx = favorites.findIndex((el: number) => el === itemId);
    favorites.splice(fIdx, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("storage"));
  };

  const removeFromFavorite = () => {
    if (!wallet) {
      lsRemoveFromFav();
    } else {
      // delete request here
    }
  };

  const addToFavorite = () => {
    if (!wallet) {
      lsAddToFav();
    } else {
      // check paid user or not
    }
  };

  return { addToFavorite, removeFromFavorite, getFavFromLs };
};

export default useFavorite;
