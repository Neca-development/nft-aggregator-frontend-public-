import React, { useState } from "react";
import { IFavorite } from "@models/favorite";
import "./favoriteItem.scss";
import Button from "@UI/Button/Button";
import DiscordIcon from "@assets/icons/discord.svg";
import TwitterIcon from "@assets/icons/twitter.svg";
import Heart from "@UI/Heart/Heart";
import Gain from "@UI/Gain/Gain";
import ItemBannerBlock from "@UI/ItemBannerBlock/ItemBannerBlock";
import CollectionModal from "@components/CollectionModal/CollectionModal";
import { collectionItemMock } from "@mocks/collection";
import EthereumIcon from "@UI/EthereumIcon/EthereumIcon";
import { hundredFormatter } from "@utils/utils";

const FavoriteItem = ({ item }: { item: IFavorite }) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  // TEMP get collection info from backend
  const tempItem = collectionItemMock;

  return (
    <>
      <article className="favItem">
        <ItemBannerBlock banner={item.bannerImage} logo={item.image} />
        <Heart isFavorite={true} />

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
          <div className="favItem__socialIcon">
            <DiscordIcon />
            {item.discordNewMessages > 0 && (
              <span>{hundredFormatter(item.discordNewMessages)}</span>
            )}
          </div>
          <div className="favItem__socialIcon">
            <TwitterIcon />
            {item.twitterNewMessages > 0 && (
              <span>{hundredFormatter(item.twitterNewMessages)}</span>
            )}
          </div>
        </div>
      </article>

      <CollectionModal
        item={tempItem}
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
      />
    </>
  );
};

export default FavoriteItem;
