import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import FavoriteItem from "@components/FavoriteItem/FavoriteItem";
import Button from "@components/UI/Button/Button";
import "./favorite.scss";
import InfoModal from "@components/InfoModal/InfoModal";
import FavoriteSkeleton from "@UI/FavoriteSkeleton/FavoriteSkeleton";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import { convertToFavItem } from "@utils/utils";
import { IFavorite } from "@models/favorite";
import { freeFavoritesSize } from "@constants/constant";
import useFavorite from "@hooks/useFavorite";
import PagePresenceWrapper from "@components/UI/PagePresenceWrapper";
import { useGetUserFavoritesQuery } from "@services/users.api";
import { useLazyGetCollectionByIdQuery } from "@services/collections.api";

function Favorite() {
  const { active, isLoggedIn } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { data: paginatedData, isLoading } = useGetUserFavoritesQuery(
    { page },
    { skip: !isLoggedIn }
  );
  const [requestCollectionById] = useLazyGetCollectionByIdQuery();
  const [favorites, setFavorites] = useState(null);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const { getFavFromLs } = useFavorite(null);

  const importFavFromLs = useCallback(async () => {
    if (isLoggedIn) {
      return;
    }
    const favFromLs = getFavFromLs();
    const findedCollections = [];
    for (const openseaId of favFromLs) {
      const res = await requestCollectionById(openseaId).unwrap();
      const converted = convertToFavItem(res);
      findedCollections.push(converted);
    }

    setFavorites(findedCollections);
  }, [getFavFromLs, isLoggedIn, requestCollectionById]);

  const renderFooterBtn = () => {
    if (!isLoggedIn) {
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

  // Initial data loading
  useEffect(() => {
    if (paginatedData?.items) {
      setFavorites(paginatedData.items);
    }
  }, [paginatedData]);

  // Import favorites from ls and listen for their deletion
  useEffect(() => {
    importFavFromLs();
    window.addEventListener("storage", importFavFromLs);

    return () => {
      window.removeEventListener("storage", importFavFromLs);
    };
  }, [importFavFromLs]);

  // TODO add lazy pagination

  return (
    <PagePresenceWrapper>
      <div className="container favorite">
        <div className="favorite__body">
          {favorites === null && (
            <section className="favorite__wrapper">
              <FavoriteSkeleton />
              <FavoriteSkeleton />
              <FavoriteSkeleton />
            </section>
          )}

          {favorites?.length > 0 && (
            <>
              <section className="favorite__wrapper">
                <AnimatePresence>
                  {favorites.map((fav: IFavorite) => (
                    <FavoriteItem key={fav.openseaId} item={fav} />
                  ))}
                </AnimatePresence>

                {isLoading && <FavoriteSkeleton />}

                {active === false &&
                  paginatedData?.meta.totalPages > 1 &&
                  Array.from(Array(3).keys()).map(i => <FavoriteSkeleton key={i} />)}
              </section>

              {active === false && favorites.length >= freeFavoritesSize && (
                <div className="favorite__loadMoreBtn">{renderFooterBtn()}</div>
              )}
            </>
          )}

          {favorites?.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="favorite__empty"
            >
              <h2>No collections in favorites</h2>
              <Button size="large" variant="gradient" onClick={() => navigate("/")}>
                Back to all items
              </Button>
            </motion.div>
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
