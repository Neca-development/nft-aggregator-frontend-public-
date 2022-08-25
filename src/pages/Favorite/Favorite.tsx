import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";

import FavoriteItem from "@components/FavoriteItem/FavoriteItem";
import Button from "@components/UI/Button/Button";
import "./favorite.scss";
import InfoModal from "@components/InfoModal/InfoModal";
import FavoriteSkeleton from "@UI/FavoriteSkeleton/FavoriteSkeleton";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import { convertToFavItem } from "@utils/utils";
import { IFavorite } from "@models/favorite";
import { FREE_FAVORITES_SIZE } from "@constants/constant";
import useFavorite from "@hooks/useFavorite";
import PagePresenceWrapper from "@components/UI/PagePresenceWrapper";
import { useGetUserFavoritesQuery } from "@services/users.api";
import { useLazyGetCollectionByIdQuery } from "@services/collections.api";

function Favorite() {
  const { active, isLoggedIn, favoritesNumber } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { data: paginatedData } = useGetUserFavoritesQuery(
    { page, perPage: 9 },
    { skip: !isLoggedIn }
  );
  const [requestCollectionById] = useLazyGetCollectionByIdQuery();
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const { getFavFromLs } = useFavorite(null);
  const bottomGradientTriggerRef = useRef(null);
  const [isGradientVisible, setIsGradientVisible] = useState(true);

  const importFavFromLs = useCallback(async () => {
    if (isLoggedIn) {
      return;
    }
    setHasMore(false);
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
    if (active === false && favoritesNumber > FREE_FAVORITES_SIZE) {
      return (
        <Button size="large" variant="gradient" onClick={() => setShowLimitModal(true)}>
          Load more
        </Button>
      );
    }
  };

  const requestNextPage = () => {
    setPage(prev => prev + 1);
  };

  const removeFavFromList = (itemId: string) => {
    const fIdx = favorites.findIndex(item => item.openseaId === itemId);
    if (fIdx < 0) {
      return;
    }
    const newArr = [...favorites];
    newArr.splice(fIdx, 1);
    setFavorites(newArr);
  };

  const toggleBottomGradient = entries => {
    const [entry] = entries;
    setIsGradientVisible(!entry.isIntersecting);
  };

  // Write incoming data
  useEffect(() => {
    if (!paginatedData) {
      return;
    }

    window.removeEventListener("storage", importFavFromLs);

    if (page === 0) {
      setFavorites(paginatedData.items);
    } else {
      setFavorites(prev => [...prev, ...paginatedData.items]);
    }
    if (page + 1 >= paginatedData.meta.totalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
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

  // Observer for bottom gradient
  useEffect(() => {
    const observer = new IntersectionObserver(toggleBottomGradient, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (bottomGradientTriggerRef.current) {
      observer.observe(bottomGradientTriggerRef.current);
    }
    return () => {
      if (bottomGradientTriggerRef.current) {
        observer.unobserve(bottomGradientTriggerRef.current);
      }
    };
  }, [bottomGradientTriggerRef.current]);

  return (
    <PagePresenceWrapper>
      <div className="container favorite">
        <div className="favorite__body">
          {favorites.length > 0 ? (
            <>
              <InfiniteScroll
                dataLength={favorites.length}
                height={document.documentElement.clientHeight * 0.8}
                next={requestNextPage}
                hasMore={hasMore}
                loader={<FavoriteSkeleton />}
              >
                <div className="favorite__wrapper">
                  <AnimatePresence>
                    {favorites.map(fav => (
                      <FavoriteItem
                        key={fav.openseaId}
                        item={fav}
                        removeFavFromList={removeFavFromList}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {active === false &&
                  paginatedData?.meta.totalPages > 1 &&
                  Array.from(Array(3).keys()).map(i => <FavoriteSkeleton key={i} />)}

                <div ref={bottomGradientTriggerRef}></div>
              </InfiniteScroll>

              {active === false && favorites.length >= FREE_FAVORITES_SIZE && (
                <div className="favorite__loadMoreBtn">{renderFooterBtn()}</div>
              )}

              <motion.div
                animate={{ opacity: isGradientVisible ? 1 : 0 }}
                className="favorite__bottomGradient"
              ></motion.div>
            </>
          ) : (
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
