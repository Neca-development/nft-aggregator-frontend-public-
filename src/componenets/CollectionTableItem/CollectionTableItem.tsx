import React, { useEffect, useState } from "react";
import "./collectionTableItem.scss";
import LinkIcon from "@assets/icons/link.svg";
import { kFormatter } from "@utils/utils";
import { ICollection } from "@models/collection";
import Heart from "@UI/Heart/Heart";
import CollectionModal from "@components/CollectionModal/CollectionModal";
import Gain from "@UI/Gain/Gain";
import EthereumIcon from "@components/UI/EthereumIcon/EthereumIcon";
import useFavorite, { FavoriteFunctionStatus } from "@hooks/useFavorite";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import InfoModal from "@components/InfoModal/InfoModal";
import { motion } from "framer-motion";

interface ICollectionTableItemProps {
  item: ICollection;
}

const CollectionTableItem = ({ item }: ICollectionTableItemProps) => {
  const { isLoggedIn } = useAppSelector(selectUserData);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [localItem, setLocalItem] = useState(item);
  const { addToFavorite, removeFromFavorite, getFavFromLs } = useFavorite(item.openseaId);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleClickFav = () => {
    if (localItem.isFavorite) {
      handleRemoveFromFav();
    } else {
      handleAddToFav();
    }
  };

  const handleAddToFav = async () => {
    const newItem = { ...localItem };
    switch (await addToFavorite()) {
      case FavoriteFunctionStatus.success:
        newItem.isFavorite = true;
        break;
      case FavoriteFunctionStatus.limit:
        setShowLimitModal(true);
        break;
    }
    setLocalItem(newItem);
  };

  const handleRemoveFromFav = async () => {
    const newItem = { ...localItem };
    switch (await removeFromFavorite()) {
      case FavoriteFunctionStatus.success:
        newItem.isFavorite = false;
        break;
    }
    setLocalItem(newItem);
  };

  useEffect(() => {
    const checkItemInLs = () => {
      const favFromLs = getFavFromLs();
      const newItem = { ...item };
      for (const openseaId of favFromLs) {
        if (openseaId === newItem.openseaId) {
          newItem.isFavorite = true;
          setLocalItem(newItem);
        }
      }
    };

    if (!isLoggedIn) {
      checkItemInLs();
    }
  }, [getFavFromLs, isLoggedIn, item]);

  return (
    <>
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="collectionTableItem"
        onClick={() => setShowCollectionModal(true)}
      >
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
      </motion.article>

      <CollectionModal
        collectionId={localItem.openseaId}
        isFavorite={localItem.isFavorite}
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
