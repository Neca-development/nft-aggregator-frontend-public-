import React, { useEffect, useState } from "react";
import "./collectionTableItem.scss";
import LinkIcon from "@assets/icons/link.svg";
import { kFormatter } from "@utils/utils";
import { ICollection } from "@models/collection";
import Heart from "@UI/Heart/Heart";
import CollectionModal from "@components/CollectionModal/CollectionModal";
import Gain from "@UI/Gain/Gain";
import EthereumIcon from "@components/UI/EthereumIcon/EthereumIcon";
import useFavorite from "@hooks/useFavorite";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import { freeFavoritesSize } from "@constants/constant";
import InfoModal from "@components/InfoModal/InfoModal";

interface ICollectionTableItemProps {
  item: ICollection;
}

const CollectionTableItem = ({ item }: ICollectionTableItemProps) => {
  const { wallet } = useAppSelector(selectUserData);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [localItem, setLocalItem] = useState(item);
  const { addToFavorite, removeFromFavorite, getFavFromLs } = useFavorite(item.openseaId);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleClickFav = () => {
    const newItem = { ...localItem };
    if (newItem.isFavorite) {
      removeFromFavorite();
      newItem.isFavorite = false;
    } else {
      let currentFavorites;
      if (!wallet) {
        currentFavorites = getFavFromLs();
      }
      if (currentFavorites.length < freeFavoritesSize) {
        addToFavorite();
        newItem.isFavorite = true;
      } else {
        setShowLimitModal(true);
      }
    }
    setLocalItem(newItem);
  };

  useEffect(() => {
    const checkItemInLs = () => {
      const favFromLs = getFavFromLs();
      const newItem = { ...item };
      for (const id of favFromLs) {
        if (id === newItem.openseaId) {
          newItem.isFavorite = true;
          setLocalItem(newItem);
        }
      }
    };

    if (!wallet) {
      checkItemInLs();
    }
  }, [wallet]);

  return (
    <>
      <article className="collectionTableItem" onClick={() => setShowCollectionModal(true)}>
        <div className="collectionTableItem__itemName">
          <img src={item.image} alt="" className="collectionTableItem__itemImage" />
          <p>{item.name}</p>
        </div>
        <p className="collectionTableItem__textSize">{item.size.toLocaleString()}</p>
        <p>
          <EthereumIcon />
          {item.floorPrice}
        </p>
        <Gain change={item.dailyChange} />
        <p>
          {kFormatter(item.discordMembersCount)}
          <a href="/" target="_blank" rel="no-referrer" onClick={e => e.stopPropagation()}>
            <LinkIcon />
          </a>
        </p>
        <p>
          {kFormatter(item.twitterFollowersCount)}
          <a href="/" target="_blank" rel="no-referrer" onClick={e => e.stopPropagation()}>
            <LinkIcon />
          </a>
        </p>
        <Heart isFavorite={localItem.isFavorite} onClick={handleClickFav} />
      </article>

      <CollectionModal
        item={localItem}
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        handleClickFav={handleClickFav}
      />

      <InfoModal
        type="reached-limit"
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
      />
    </>
  );
};

export default CollectionTableItem;
