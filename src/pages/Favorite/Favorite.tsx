import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteItem from "@components/FavoriteItem/FavoriteItem";
import Button from "@components/UI/Button/Button";
import { favoriteItemMock } from "@mocks/favorite";
import "./favorite.scss";
import { useModal } from "@hooks/useModal";
import InfoModal from "@components/InfoModal/InfoModal";
import FavoriteSkeleton from "@UI/FavoriteSkeleton/FavoriteSkeleton";
import { motion } from "framer-motion";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";

const favoritesMock = [favoriteItemMock, favoriteItemMock, favoriteItemMock];

function Favorite() {
  const { active } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const { toggle: openLimitModal, hookModal } = useModal();

  return (
    <motion.main
      className="container favorite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="favorite__body">
        {favoritesMock.length > 0 ? (
          <>
            <section className="favorite__wrapper">
              {favoritesMock.map((fav, idx) => (
                <FavoriteItem key={idx} item={fav} />
              ))}
              {/* Check later: show skeletons if favorites size=3? */}
              {favoritesMock.length >= 3 &&
                Array.from(Array(3).keys()).map(i => <FavoriteSkeleton key={i} />)}
            </section>
            {active === false && favoritesMock.length >= 3 && (
              <div className="favorite__loadMoreBtn">
                <Button size="large" variant="gradient" onClick={openLimitModal}>
                  Load more
                </Button>
              </div>
            )}

            {hookModal(<InfoModal type="expired" />)}
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
    </motion.main>
  );
}

export default Favorite;
