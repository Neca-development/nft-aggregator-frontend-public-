import React, { useState } from "react";
import { ICollection } from "../../models/collection";
import "./collectionModal.scss";
import verifiedIcon from "../../assets/icons/verified.svg";
import Heart from "../UI/Heart/Heart";
import Button from "../UI/Button/Button";
import etherBlue from "../../assets/icons/ether-blue.svg";
import Gain from "../UI/Gain/Gain";
import classNames from "classnames";
import SocialIcon from "../UI/SocialIcon/SocialIcon";
import { convertDate } from "../../app/utils";
import Tabs from "../UI/Tabs/Tabs";
import ItemBannerBlock from "../UI/ItemBannerBlock/ItemBannerBlock";

enum CollectionTabs {
  discord = "Discord",
  twitter = "Twitter",
}

const CollectionModal = ({ item }: { item: ICollection }) => {
  const [activeTab, setActiveTab] = useState(CollectionTabs.discord);
  const [showFullDescr, setShowFullDescr] = useState(false);
  // TEMP access flag
  const hasAccess = false;

  return (
    <section className="colModal">
      <div className="colModal__messages mesg">
        <div className="mesg__tabs">
          <Tabs
            tabsArray={[CollectionTabs.discord, CollectionTabs.twitter]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className="mesg__body">
          {activeTab === CollectionTabs.discord &&
            item.discordMessages.map(msg => (
              <div key={msg.id} className="mesg__item singleMessage">
                <div className="singleMessage__header">
                  <img src={msg.author.image} alt="avatar" />
                  <p>{msg.author.name}</p>
                  <span>{convertDate(msg.createdAt)}</span>
                </div>
                <p className="singleMessage__text">{msg.text}</p>
              </div>
            ))}
          {activeTab === CollectionTabs.twitter &&
            (hasAccess ? (
              item.twitter.messages.map((msg, idx) => (
                <div key={idx} className="mesg__item singleMessage">
                  <div className="singleMessage__header">
                    <img src={item.twitter.author.image} alt="avatar" />
                    <p>{item.twitter.author.name}</p>
                    {/* NEED twitter message created at date  */}
                    {/* <span>{convertDate(msg.createdAt)}</span> */}
                  </div>
                  <p className="singleMessage__text">{msg}</p>
                </div>
              ))
            ) : (
              <div className="mesg__noAccess">
                <p>Viewing tweets is only available with a paid subscription</p>
                <Button variant="gradient" size="large">
                  Buy subscription
                </Button>
              </div>
            ))}
        </div>
      </div>

      <div className="colModal__info colModalInfo">
        {/* NEED BANNER IMAGE */}
        <ItemBannerBlock banner={item.banner} logo={item.image} />

        <div className="colModalInfo__header">
          <div className="colModalInfo__headerText">
            <h3>
              {item.name} <img src={verifiedIcon} alt="verified" />
            </h3>
            <span>created {convertDate(item.createdAt)}</span>
          </div>
          <Heart isFavorite={item.isFavorite} />
        </div>

        <div className="colModalInfo__mainNumbers">
          <p>
            Collection size <span>{item.size.toLocaleString()}</span>
          </p>
          <p>
            Owners <span>{item.ownersCount}</span>
          </p>
          {/* ATTENTION LATER */}
          <Button variant="link">
            <a
              href={`https://opensea.io/collection/${item.openseaId}`}
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
                <img src={etherBlue} alt="" />
                {item.floorPrice}
              </span>
            </p>
          </div>
          <div className="colModalInfo__statItem">
            <p className="colModalInfo__statTitle">
              Volume traded
              <span>
                <img src={etherBlue} alt="" />
                {item.volumeTraded}
              </span>
            </p>
          </div>
          <div className="colModalInfo__statItem">
            <p className="colModalInfo__statTitle">Floor price change</p>
            <div className="colModalInfo__statGains">
              <p>
                24hr <Gain change={item.dailyChange} />
              </p>
              <p>
                7 days <Gain change={item.weeklyChange} />
              </p>
              <p>
                30 days <Gain change={item.monthlyChange} />
              </p>
            </div>
          </div>
        </div>

        <div
          className={classNames("colModalInfo__about", {
            colModalInfo__about_full: showFullDescr === true,
          })}
        >
          <p>{item.description}</p>
          {item.description.length > 100 && (
            <button onClick={() => setShowFullDescr(!showFullDescr)}>
              {showFullDescr ? "close" : "show more"}
            </button>
          )}
        </div>

        <div className="colModalInfo__social">
          <SocialIcon
            community="discord"
            number={item.discordMembersCount}
            link="/"
            showLinkIcon={false}
          />
          <SocialIcon
            community="twitter"
            number={item.twitterFollowersCount}
            link="/"
            showLinkIcon={false}
          />
          {/* NEED LINK TO SITE */}
          <a href="/">docs.impostors.gg</a>
        </div>
      </div>
    </section>
  );
};

export default CollectionModal;
