import React, { useEffect, useState } from "react";
import "./collectionModal.scss";
import Button from "@UI/Button/Button";
import Tabs from "@UI/Tabs/Tabs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import BaseModal from "@components/UI/BaseModal/BaseModal";
import { useLazyGetCollectionByIdQuery } from "@services/collections.api";
import CollectionInfo from "./CollectionInfo";
import SingleMessage from "./SingleMessage";

// export enum CollectionTabs {
//   discord = "Discord",
//   twitter = "Twitter",
// }

export type CollectionTabs = "discord" | "twitter";

interface ICollectionModalProps {
  collectionId: string;
  isFavorite: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleClickFav: () => void;
  initialTab?: CollectionTabs;
}

const CollectionModal = ({
  collectionId,
  isFavorite,
  isOpen,
  onClose,
  handleClickFav,
  initialTab = "discord",
}: ICollectionModalProps) => {
  const navigate = useNavigate();
  const { active } = useAppSelector(selectUserData);
  const [trigger, { data, isLoading, isError }] = useLazyGetCollectionByIdQuery();

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // TODO maybe move to component
  const renderMessages = () => {
    switch (activeTab) {
      case "discord":
        if (data.discordMessages?.length > 0) {
          return data.discordMessages.map(msg => (
            <SingleMessage
              key={msg.id}
              avatar={msg.author.image}
              name={msg.author.name}
              createdAt={msg.createdAt}
              message={msg.text}
            />
          ));
        } else {
          return <div>No messages from discord</div>;
        }
      case "twitter":
        if (data.twitter?.messages.length > 0) {
          return data.twitter.messages.map(msg => (
            <SingleMessage
              key={msg.id}
              avatar={data.twitter.author.image}
              name={data.twitter.author.name}
              createdAt={msg.createdAt}
              message={msg.message}
            />
          ));
        } else {
          return <div>No messages from twitter</div>;
        }
    }
  };

  useEffect(() => {
    if (isOpen) {
      trigger(collectionId);
    }
  }, [isOpen, collectionId, trigger]);

  if (!data) {
    return;
  }

  return (
    <BaseModal isOpen={isOpen} closeModal={onClose}>
      <section className="colModal">
        <div className="colModal__messages mesg">
          <div className="mesg__tabs">
            <Tabs
              tabsArray={["discord", "twitter"]}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="mesg__body">
            {active ? (
              // TODO check pagination
              renderMessages()
            ) : (
              <div className="mesg__noAccess">
                <p>Viewing messages is only available with a paid subscription</p>
                <Button variant="gradient" size="large" onClick={() => navigate("/profile")}>
                  Buy Subscription
                </Button>
              </div>
            )}
          </div>
        </div>

        <CollectionInfo data={data} isFavorite={isFavorite} handleClickFav={handleClickFav} />
      </section>
    </BaseModal>
  );
};

export default CollectionModal;
