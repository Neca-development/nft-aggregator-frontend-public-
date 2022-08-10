import React, { useState } from "react";
import { ICollection } from "@models/collection";
import "./collectionModal.scss";
import VerifiedIcon from "@assets/icons/verified.svg";
import Heart from "@UI/Heart/Heart";
import Button from "@UI/Button/Button";
import EtherBlue from "@assets/icons/ether-blue.svg";
import Gain from "@UI/Gain/Gain";
import classNames from "classnames";
import SocialIcon from "@UI/SocialIcon/SocialIcon";
import { formatDate, kFormatter } from "@utils/utils";
import Tabs from "@UI/Tabs/Tabs";
import ItemBannerBlock from "@UI/ItemBannerBlock/ItemBannerBlock";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import BaseModal from "@components/UI/BaseModal/BaseModal";

enum CollectionTabs {
  discord = "Discord",
  twitter = "Twitter",
}

const CollectionModal = ({
  item,
  isOpen,
  onClose,
}: {
  item: ICollection;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { active } = useAppSelector(selectUserData);

  const [activeTab, setActiveTab] = useState(CollectionTabs.discord);
  const [showFullDescr, setShowFullDescr] = useState(false);

  return (
    <BaseModal isOpen={isOpen} closeModal={onClose}>
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
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                  <p className="singleMessage__text">{msg.text}</p>
                </div>
              ))}
            {activeTab === CollectionTabs.twitter &&
              (active ? (
                item.twitter.messages.map((msg, idx) => (
                  <div key={idx} className="mesg__item singleMessage">
                    <div className="singleMessage__header">
                      <img src={item.twitter.author.image} alt="avatar" />
                      <p>{item.twitter.author.name}</p>
                      {/* NEED twitter message created at date  */}
                      {/* <span>{formatDate(msg.createdAt)}</span> */}
                    </div>
                    <p className="singleMessage__text">{msg}</p>
                  </div>
                ))
              ) : (
                <div className="mesg__noAccess">
                  <p>Viewing tweets is only available with a paid subscription</p>
                  <Button variant="gradient" size="large" onClick={() => navigate("/profile")}>
                    Buy Subscription
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
                {item.name} <VerifiedIcon />
              </h3>
              <span>created {formatDate(item.createdAt)}</span>
            </div>
            <Heart isFavorite={item.isFavorite} />
          </div>

          <div className="colModalInfo__mainNumbers">
            <p>
              Collection size <span>{item.size.toLocaleString()}</span>
            </p>
            <p>
              Owners <span>{kFormatter(item.ownersCount)}</span>
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
                  <EtherBlue />
                  {item.floorPrice}
                </span>
              </p>
            </div>
            <div className="colModalInfo__statItem">
              <p className="colModalInfo__statTitle">
                Volume traded
                <span>
                  <EtherBlue />
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
              showLinkIcon={true}
            />
            <SocialIcon
              community="twitter"
              number={item.twitterFollowersCount}
              link="/"
              showLinkIcon={true}
            />
            {/* NEED LINK TO COLLECTION SITE */}
            <a href="/" target="_blank" rel="no-referrer">
              docs.impostors.gg
            </a>
          </div>
        </div>
      </section>
    </BaseModal>
  );
};

export default CollectionModal;
