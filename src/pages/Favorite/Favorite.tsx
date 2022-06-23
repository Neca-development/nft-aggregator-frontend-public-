import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteItem from "../../componenets/FavoriteItem/FavoriteItem";
import Button from "../../componenets/UI/Button/Button";
import { favoriteItemMock } from "../../mocks/favorite";
import "./favorite.scss";
import favoriteTempSkeleton from "../../assets/images/favorite-skeleton.png";

const favoritesMock = [favoriteItemMock, favoriteItemMock, favoriteItemMock];

function Favorite() {
  const navigate = useNavigate();

  return (
    <main className="container favorite">
      <div className="favorite__body">
        {favoritesMock.length > 0 ? (
          <>
            <section className="favorite__wrapper">
              {favoritesMock.map((fav, idx) => (
                <FavoriteItem key={idx} item={fav} />
              ))}
              <img src={favoriteTempSkeleton} alt="" />
              <img src={favoriteTempSkeleton} alt="" />
              <img src={favoriteTempSkeleton} alt="" />
            </section>
            <div className="favorite__loadMoreBtn">
              <Button size="large" variant="gradient">
                Load more
              </Button>
            </div>
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
