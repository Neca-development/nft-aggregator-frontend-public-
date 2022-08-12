import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteItem from "@components/FavoriteItem/FavoriteItem";
import Button from "@components/UI/Button/Button";
import "./favorite.scss";
import InfoModal from "@components/InfoModal/InfoModal";
import FavoriteSkeleton from "@UI/FavoriteSkeleton/FavoriteSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import { convertToFavItem } from "@utils/utils";
import { collectionsDataMock } from "@mocks/collection";
import { IFavorite } from "@models/favorite";
import { freeFavoritesSize } from "@constants/constant";
import PagePresenceWrapper from "@components/UI/PagePresenceWrapper";

function Favorite() {
  const { active, wallet } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [favorites, setFavorites] = useState(null);

  const importFavFromLs = useCallback(() => {
    if (wallet) {
      return;
    }
    const favFromLs = JSON.parse(localStorage.getItem("favorites"));
    const findedCollections = [];
    // request /api/collection/id here by each fav id

    // TEMP
    // favFromLs.forEach((id: number) => {
    //   const finded = collectionsDataMock.collections.find(c => c.id === id);
    //   const converted = convertToFavItem(finded);
    //   findedCollections.push(converted);
    // });

    setFavorites(findedCollections);
  }, [wallet]);

  const renderFooterBtn = () => {
    if (!wallet) {
      return (
        <Button size="large" variant="gradient" onClick={() => navigate("/profile")}>
          Connect wallet
        </Button>
      );
    }
    if (active === false) {
      return (
        <Button size="large" variant="gradient" onClick={() => setShowLimitModal(true)}>
          Load more
        </Button>
      );
    }
  };

  // listen for deletion in ls
  useEffect(() => {
    importFavFromLs();
    window.addEventListener("storage", importFavFromLs);

    return () => {
      window.removeEventListener("storage", importFavFromLs);
    };
  }, [importFavFromLs]);

  return (
    <PagePresenceWrapper>
      <div className="container favorite">
        <div className="favorite__body">
          {favorites && favorites.length > 0 ? (
            <>
              <section className="favorite__wrapper">
                <AnimatePresence>
                  {favorites.map((fav: IFavorite) => (
                    <FavoriteItem key={fav.collectionId} item={fav} />
                  ))}
                </AnimatePresence>
                {/* Check later: show skeletons if favorites size=3? */}
                {favorites.length >= freeFavoritesSize &&
                  Array.from(Array(3).keys()).map(i => <FavoriteSkeleton key={i} />)}
              </section>

              {favorites.length >= freeFavoritesSize && (
                <div className="favorite__loadMoreBtn">{renderFooterBtn()}</div>
              )}
            </>
          ) : (
            <div className="favorite__empty">
              <h2>No collections in favorites</h2>
              <Button size="large" variant="gradient" onClick={() => navigate("/")}>
                Back to all items
              </Button>
            </div>
          )}
        </div>

        <InfoModal
          type="expired"
          isOpen={showLimitModal}
          onClose={() => setShowLimitModal(false)}
        />
      </div>
    </PagePresenceWrapper>
  );
}

export default Favorite;
