import React from "react";
import "./collectionTableItem.scss";
import etherIcon from "../../assets/icons/Ethereum.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import linkIcon from "../../assets/icons/link.svg";
import { kFormatter } from "../../app/utils";
import { ICollection } from "../../models/collection";
import Heart from "../UI/Heart/Heart";

interface ICollectionTableItemProps {
  item: ICollection;
}

const CollectionTableItem = ({ item }: ICollectionTableItemProps) => {
  return (
    <article className="collectionTableItem">
      <div className="collectionTableItem__itemName">
        <img src={item.image} alt="" className="collectionTableItem__itemImage" />
        <p>{item.name}</p>
      </div>
      <p className="collectionTableItem__textSize">{item.size.toLocaleString()}</p>
      <p>
        <img src={etherIcon} alt="ether" />
        {item.floorPrice}
      </p>
      {item.dailyChange >= 0 ? (
        <p className="collectionTableItem__textDaily">
          <img src={arrowUp} alt="change" />
          {item.dailyChange}%
        </p>
      ) : (
        <p className="collectionTableItem__textDaily collectionTableItem__textDaily_down">
          <img src={arrowDown} alt="change" />
          {item.dailyChange}%
        </p>
      )}
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
  );
};

export default CollectionTableItem;
