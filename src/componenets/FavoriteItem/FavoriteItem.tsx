import React from "react";
import { IFavorite } from "../../models/favorite";
import "./favoriteItem.scss";
import etherLogo from "../../assets/icons/Ethereum.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";
import arrowDown from "../../assets/icons/arrow-down.svg";
import Button from "../UI/Button/Button";
import discordIcon from "../../assets/icons/discord.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import { hundredFormatter } from "../../app/utils";
import Heart from "../UI/Heart/Heart";

const FavoriteItem = ({ item }: { item: IFavorite }) => {
  return (
    <article className="favItem">
      <div className="favItem__imageBlock">
        <img src={item.bannerImage} alt="" className="favItem__bg" />
        <img src={item.image} alt="" className="favItem__logo" />
        <Heart isFavorite={true} />
      </div>
      <h4>{item.name}</h4>
      <div className="favItem__stats">
        <p style={{ marginRight: "0.5rem" }}>
          Floor price <img src={etherLogo} alt="" />
          {item.floorPrice}
        </p>
        {/* maybe rewrite later */}
        {item.dailyChange > 0 ? (
          <p>
            24h change <img src={arrowUp} alt="" />
            <span className="favItem__increase">{item.dailyChange}%</span>
          </p>
        ) : (
          <p>
            24h change <img src={arrowDown} alt="" />
            <span className="favItem__decrease">{item.dailyChange}%</span>
          </p>
        )}
      </div>
      <div className="favItem__stats favItem__stats_bottom">
        <Button>View more details</Button>
        <div className="favItem__socialIcon">
          <img src={discordIcon} alt="" />
          {item.discordNewMessages > 0 && <span>{hundredFormatter(item.discordNewMessages)}</span>}
        </div>
        <div className="favItem__socialIcon">
          <img src={twitterIcon} alt="" />
          {item.twitterNewMessages > 0 && <span>{hundredFormatter(item.twitterNewMessages)}</span>}
        </div>
      </div>
    </article>
  );
};

export default FavoriteItem;
