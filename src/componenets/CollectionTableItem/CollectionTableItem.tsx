import React, { useState } from "react";
import "./collectionTableItem.scss";
import LinkIcon from "@assets/icons/link.svg";
import { kFormatter } from "@utils/utils";
import { ICollection } from "@models/collection";
import Heart from "@UI/Heart/Heart";
import CollectionModal from "@components/CollectionModal/CollectionModal";
import Gain from "@UI/Gain/Gain";
import EthereumIcon from "@components/UI/EthereumIcon/EthereumIcon";

interface ICollectionTableItemProps {
  item: ICollection;
}

const CollectionTableItem = ({ item }: ICollectionTableItemProps) => {
  const [showCollectionModal, setShowCollectionModal] = useState(false);

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
        <Heart isFavorite={item.isFavorite} />
      </article>

      <CollectionModal
        item={item}
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
      />
    </>
  );
};

export default CollectionTableItem;
