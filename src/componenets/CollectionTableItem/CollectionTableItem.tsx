import React from "react";
import "./collectionTableItem.scss";
import etherIcon from "../../assets/icons/Ethereum.svg";
import linkIcon from "../../assets/icons/link.svg";
import { kFormatter } from "../../app/utils";
import { ICollection } from "../../models/collection";
import Heart from "../UI/Heart/Heart";
import { useModal } from "../../app/useModal";
import CollectionModal from "../CollectionModal/CollectionModal";
import Gain from "../UI/Gain/Gain";

interface ICollectionTableItemProps {
  item: ICollection;
}

const CollectionTableItem = ({ item }: ICollectionTableItemProps) => {
  const { toggle: openCollectionModal, hookModal } = useModal();

  return (
    <>
      <article className="collectionTableItem" onClick={openCollectionModal}>
        <div className="collectionTableItem__itemName">
          <img src={item.image} alt="" className="collectionTableItem__itemImage" />
          <p>{item.name}</p>
        </div>
        <p className="collectionTableItem__textSize">{item.size.toLocaleString()}</p>
        <p>
          <img src={etherIcon} alt="ether" />
          {item.floorPrice}
        </p>
        <Gain change={item.dailyChange} />
        <p>
          {kFormatter(item.discordMembersCount)}
          <a href="/" target="_blank" rel="no-referrer" onClick={e => e.stopPropagation()}>
            <img src={linkIcon} alt="discord" />
          </a>
        </p>
        <p>
          {kFormatter(item.twitterFollowersCount)}
          <a href="/" target="_blank" rel="no-referrer" onClick={e => e.stopPropagation()}>
            <img src={linkIcon} alt="twitter" />
          </a>
        </p>
        <Heart isFavorite={item.isFavorite} />
      </article>

      {hookModal(<CollectionModal item={item} />)}
    </>
  );
};

export default CollectionTableItem;
