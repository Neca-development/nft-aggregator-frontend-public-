import React, { useState } from "react";
import { IFavorite } from "@models/favorite";
import "./favoriteItem.scss";
import Button from "@UI/Button/Button";
import DiscordIcon from "@assets/icons/discord.svg";
import TwitterIcon from "@assets/icons/twitter.svg";
import Heart from "@UI/Heart/Heart";
import Gain from "@UI/Gain/Gain";
import ItemBannerBlock from "@UI/ItemBannerBlock/ItemBannerBlock";
import CollectionModal, { CollectionTabs } from "@components/CollectionModal/CollectionModal";
import EthereumIcon from "@UI/EthereumIcon/EthereumIcon";
import { hundredFormatter } from "@utils/utils";
import useFavorite from "@hooks/useFavorite";
import { motion } from "framer-motion";

interface IFavoriteItemProps {
  item: IFavorite;
}

const FavoriteItem = ({ item }: IFavoriteItemProps) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const { removeFromFavorite } = useFavorite(item.openseaId);
  const [desiredTab, setDesiredTab] = useState<CollectionTabs>("discord");

  const handleRemoveFromFav = async () => {
    await removeFromFavorite();
  };

  const openModalWithDesiredTab = (tab: CollectionTabs) => {
    setDesiredTab(tab);
    setShowCollectionModal(true);
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
            {item.floorPrice}
          </p>
          <p>
            24h change
            <Gain change={item.dailyChange} />
          </p>
        </div>
        <div className="favItem__stats favItem__stats_bottom">
          <Button onClick={() => setShowCollectionModal(true)}>View more details</Button>
          <div className="favItem__socialIcon" onClick={() => openModalWithDesiredTab("discord")}>
            <DiscordIcon />
            {item.discordNewMessages > 0 && (
              <span>{hundredFormatter(item.discordNewMessages)}</span>
            )}
          </div>
          <div className="favItem__socialIcon" onClick={() => openModalWithDesiredTab("twitter")}>
            <TwitterIcon />
            {item.twitterNewMessages > 0 && (
              <span>{hundredFormatter(item.twitterNewMessages)}</span>
            )}
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
      />
    </>
  );
};

export default FavoriteItem;
