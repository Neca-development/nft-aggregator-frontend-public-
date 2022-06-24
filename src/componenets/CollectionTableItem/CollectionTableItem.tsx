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
  const { toggle: openModal, HookModal } = useModal();

  return (
    <>
      <article className="collectionTableItem">
        <div className="collectionTableItem__itemName" onClick={openModal}>
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
          <a href="/">
            <img src={linkIcon} alt="discord" />
          </a>
        </p>
        <p>
          {kFormatter(item.twitterFollowersCount)}
          <a href="/">
            <img src={linkIcon} alt="twitter" />
          </a>
        </p>
        <Heart isFavorite={item.isFavorite} />
      </article>

      {HookModal(<CollectionModal item={item} />)}
    </>
  );
};

export default CollectionTableItem;
