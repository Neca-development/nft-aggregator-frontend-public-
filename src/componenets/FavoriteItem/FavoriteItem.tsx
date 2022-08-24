import React, { useState } from "react";
import { motion } from "framer-motion";

import { IFavorite } from "@models/favorite";
import "./favoriteItem.scss";
import Button from "@UI/Button/Button";
import DiscordIcon from "@assets/icons/discord.svg";
import TwitterIcon from "@assets/icons/twitter.svg";
import Heart from "@UI/Heart/Heart";
import Gain from "@UI/Gain/Gain";
import ItemBannerBlock from "@UI/ItemBannerBlock/ItemBannerBlock";
import CollectionModal from "@components/CollectionModal/CollectionModal";
import EthereumIcon from "@UI/EthereumIcon/EthereumIcon";
import { hundredFormatter, roundFloorPrice } from "@utils/utils";
import useFavorite from "@hooks/useFavorite";
import { collectionTabs } from "@constants/constant";
import { ITab } from "@components/UI/Tabs/Tabs";

interface IFavoriteItemProps {
  item: IFavorite;
}

const FavoriteItem = ({ item }: IFavoriteItemProps) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const { removeFromFavorite } = useFavorite(item.openseaId);
  const [desiredTab, setDesiredTab] = useState(collectionTabs[0]);
  const [hasNewMessages, setHasNewMessages] = useState({
    discord: item.discordNewMessages > 0,
    twitter: item.twitterNewMessages > 0,
  });

  const handleRemoveFromFav = async () => {
    await removeFromFavorite();
  };

  const openModalWithDesiredTab = (tab: ITab) => {
    setDesiredTab(tab);
    setShowCollectionModal(true);
  };

  const hideMessagesBadge = (tab: "discord" | "twitter") => {
    switch (tab) {
      case "discord":
        setHasNewMessages(prev => ({ ...prev, discord: false }));
        break;
      case "twitter":
        setHasNewMessages(prev => ({ ...prev, twitter: false }));
        break;
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -200 }}
        transition={{ duration: 0.15 }}
        className="favItem"
      >
        <ItemBannerBlock banner={item.bannerImage} logo={item.image} />
        <Heart isFavorite={true} onClick={handleRemoveFromFav} />

        <h4>{item.name}</h4>
        <div className="favItem__stats">
          <p style={{ marginRight: "0.5rem" }}>
            Floor price <EthereumIcon />
            {roundFloorPrice(item.floorPrice)}
          </p>
          <p>
            24h change
            <Gain change={item.dailyChange} />
          </p>
        </div>
        <div className="favItem__stats favItem__stats_bottom">
          <Button onClick={() => setShowCollectionModal(true)}>View more details</Button>
          <div
            className="favItem__socialIcon"
            onClick={() => openModalWithDesiredTab(collectionTabs[0])}
          >
            <DiscordIcon />
            {hasNewMessages.discord && <span>{hundredFormatter(item.discordNewMessages)}</span>}
          </div>
          <div
            className="favItem__socialIcon"
            onClick={() => openModalWithDesiredTab(collectionTabs[1])}
          >
            <TwitterIcon />
            {hasNewMessages.twitter && <span>{hundredFormatter(item.twitterNewMessages)}</span>}
          </div>
        </div>
      </motion.article>

      <CollectionModal
        collectionId={item.openseaId}
        isFavorite={true}
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        handleClickFav={handleRemoveFromFav}
        initialTab={desiredTab}
        hideMessagesBadge={hideMessagesBadge}
      />
    </>
  );
};

export default FavoriteItem;
