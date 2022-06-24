import React from "react";
import { IGaaItem } from "../../models/gaa";
import "./gaaTableItem.scss";
import etherIcon from "../../assets/icons/Ethereum.svg";
import Button from "../UI/Button/Button";
import SocialIcon from "../UI/SocialIcon/SocialIcon";
import ItemBannerBlock from "../UI/ItemBannerBlock/ItemBannerBlock";

const GaATableItem = ({ item }: { item: IGaaItem }) => {
  return (
    <article className="gaaItem">
      <ItemBannerBlock banner={item.bannerImage} logo={item.image} />

      <div className="gaaItem__descr">
        <h3>{item.name}</h3>
        <div className="gaaItem__stat">
          <p>
            NFT: {item.size.toLocaleString()} <span>items</span>
          </p>
          <p className="gaaItem__price">
            Floor price: <img src={etherIcon} alt="" className="etherIcon" />
            {item.floorPrice}
          </p>
        </div>
        {item.discordMessage.channelType === "giveaway" && (
          <h4 style={{ color: "#00B6A0" }}>Giveaway:</h4>
        )}
        {item.discordMessage.channelType === "announcement" && (
          <h4 style={{ color: "#219CFB" }}>Announcement:</h4>
        )}
        <p className="gaaItem__text">{item.discordMessage.text}</p>
      </div>

      <div className="gaaItem__controls">
        <Button>Expand</Button>
        <SocialIcon community="discord" number={99200} link="/" showLinkIcon={true} />
      </div>
    </article>
  );
};

export default GaATableItem;