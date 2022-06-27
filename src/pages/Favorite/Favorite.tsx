import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteItem from "../../componenets/FavoriteItem/FavoriteItem";
import Button from "../../componenets/UI/Button/Button";
import { favoriteItemMock } from "../../mocks/favorite";
import "./favorite.scss";
import { useModal } from "../../app/useModal";
import InfoModal from "../../componenets/InfoModal/InfoModal";
import { useAppSelector } from "../../app/hooks";
import FavoriteSkeleton from "../../componenets/UI/FavoriteSkeleton/FavoriteSkeleton";

const favoritesMock = [favoriteItemMock, favoriteItemMock, favoriteItemMock];

function Favorite() {
  const { hasSubscription } = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const { toggle: openLimitModal, hookModal } = useModal();

  return (
    <main className="container favorite">
      <div className="favorite__body">
        {favoritesMock.length > 0 ? (
          <>
            <section className="favorite__wrapper">
              {favoritesMock.map((fav, idx) => (
                <FavoriteItem key={idx} item={fav} />
              ))}
              <FavoriteSkeleton />
              <FavoriteSkeleton />
              <FavoriteSkeleton />
            </section>
            {hasSubscription === false && (
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
    </main>
  );
}

export default Favorite;
