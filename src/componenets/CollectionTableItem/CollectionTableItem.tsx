import React from "react";
import "./collectionTableItem.scss";
import etherIcon from "../../assets/icons/Ethereum.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import linkIcon from "../../assets/icons/link.svg";
import heartOutline from "../../assets/icons/heart-outline.svg";
import heartFull from "../../assets/icons/heart-full.svg";
import { kFormatter } from "../../app/utils";

// TODO type
interface ICollectionTableItemProps {
  item: any;
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
      <img
        src={item.isFavorite ? heartFull : heartOutline}
        alt="like"
        className="collectionTableItem__fav"
      />
    </article>
  );
};

export default CollectionTableItem;
