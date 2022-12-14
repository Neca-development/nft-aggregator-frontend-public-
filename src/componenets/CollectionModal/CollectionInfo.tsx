import React, { useState } from "react";
import classNames from "classnames";

import ItemBannerBlock from "@components/UI/ItemBannerBlock/ItemBannerBlock";
import "./collectionModal.scss";
import VerifiedIcon from "@assets/icons/verified.svg";
import Heart from "@UI/Heart/Heart";
import Button from "@UI/Button/Button";
import EtherBlue from "@assets/icons/ether-blue.svg";
import Gain from "@UI/Gain/Gain";
import SocialIcon from "@UI/SocialIcon/SocialIcon";
import { createTwitterLink, formatDate, kFormatter, roundFloorPrice } from "@utils/utils";
import { ICollection } from "@models/collection";
import useTextParser from "@hooks/useTextParser";

interface ICollectionInfoProps {
  data: ICollection;
  handleClickFav: () => void;
  isFavorite: boolean;
}

const CollectionInfo = ({ data, handleClickFav, isFavorite }: ICollectionInfoProps) => {
  const [showFullDescr, setShowFullDescr] = useState(false);
  const parsedDescription = useTextParser(data.description, { renderAs: "p" });

  const toggleShowFullDescr = () => {
    setShowFullDescr(!showFullDescr);
  };

  return (
    <div className="colModal__info colModalInfo">
      <ItemBannerBlock banner={data.bannerImage} logo={data.image} />

      <div className="colModalInfo__header">
        <div className="colModalInfo__headerText">
          <h3>
            {data.name} <VerifiedIcon />
          </h3>
          <span>created {formatDate(data.createdAt)}</span>
        </div>
        <Heart isFavorite={isFavorite} onClick={handleClickFav} />
      </div>

      <div className="colModalInfo__mainNumbers">
        <p>
          Collection size <span>{kFormatter(data.size)}</span>
        </p>
        <p>
          Owners <span>{kFormatter(data.owners)}</span>
        </p>
        <Button variant="link">
          <a
            href={`https://opensea.io/collection/${data.openseaId}`}
            target="_blank"
            rel="noreferrer"
          >
            Buy on OpenSea
          </a>
        </Button>
      </div>

      <div className="colModalInfo__stats">
        <div className="colModalInfo__statItem">
          <p className="colModalInfo__statTitle">
            Floor price
            <span>
              <EtherBlue />
              {roundFloorPrice(data.floorPrice)}
            </span>
          </p>
        </div>
        <div className="colModalInfo__statItem">
          <p className="colModalInfo__statTitle">
            Volume traded
            <span>
              <EtherBlue />
              {kFormatter(+data.volumeTraded)}
            </span>
          </p>
        </div>
        <div className="colModalInfo__statItem">
          <p className="colModalInfo__statTitle">Floor price change</p>
          <div className="colModalInfo__statGains">
            <p>
              24hr <Gain change={data.dailyChange} />
            </p>
            <p>
              7 days <Gain change={data.weeklyChange} />
            </p>
            <p>
              30 days <Gain change={data.monthlyChange} />
            </p>
          </div>
        </div>
      </div>

      <div
        className={classNames("colModalInfo__about", {
          colModalInfo__about_full: showFullDescr === true,
        })}
      >
        {parsedDescription}

        {data.description.length > 100 && (
          <button onClick={toggleShowFullDescr}>{showFullDescr ? "close" : "show more"}</button>
        )}
      </div>

      <div className="colModalInfo__social">
        <SocialIcon
          community="discord"
          number={data.discordMembersCount}
          link={data.discordInviteLink}
          showLinkIcon={data.discordInviteLink ? true : false}
        />
        <SocialIcon
          community="twitter"
          number={data.twitterFollowersCount}
          link={createTwitterLink(data.twitterUsername)}
          showLinkIcon={data.twitterUsername ? true : false}
        />
        {data.link && (
          <a href={data.link} target="_blank" rel="noreferrer">
            {data.link}
          </a>
        )}
      </div>
    </div>
  );
};

export default CollectionInfo;
