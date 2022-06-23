import React from "react";
import { IGaaItem } from "../../models/gaa";
import "./gaaTableItem.scss";
import etherIcon from "../../assets/icons/Ethereum.svg";
import Button from "../UI/Button/Button";
import discordIcon from "../../assets/icons/discord.svg";
import linkIcon from "../../assets/icons/link.svg";
import { kFormatter } from "../../app/utils";

const GaATableItem = ({ item }: { item: IGaaItem }) => {
  return (
    <article className="gaaItem">
      <div className="favItem__imageBlock">
        <img src={item.bannerImage} alt="" className="favItem__bg" />
        <img src={item.image} alt="" className="favItem__logo" />
      </div>

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
        <div className="gaaItem__social">
          <img src={discordIcon} alt="discord" />
          {/* TODO add discord members count */}
          <p>{kFormatter(99200)}</p>
          <a href="/">
            <img src={linkIcon} alt="" />
          </a>
        </div>
      </div>
    </article>
  );
};

export default GaATableItem;
