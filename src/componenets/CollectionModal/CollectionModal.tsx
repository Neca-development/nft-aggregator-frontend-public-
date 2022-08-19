import React, { useEffect, useState } from "react";
import "./collectionModal.scss";
import { useNavigate } from "react-router-dom";

import Button from "@UI/Button/Button";
import Tabs from "@UI/Tabs/Tabs";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import BaseModal from "@components/UI/BaseModal/BaseModal";
import { useLazyGetCollectionByIdQuery } from "@services/collections.api";
import Loader from "@components/UI/Loader/Loader";

import CollectionInfo from "./CollectionInfo";
import SingleMessage from "./SingleMessage";

// TODO rewrite better
const collectionTabs = [
  { name: "Discord", type: 0 },
  { name: "Twitter", type: 1 },
];

interface ICollectionModalProps {
  collectionId: string;
  isFavorite: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleClickFav: () => void;
}

const CollectionModal = ({
  collectionId,
  isFavorite,
  isOpen,
  onClose,
  handleClickFav,
}: ICollectionModalProps) => {
  const navigate = useNavigate();
  const { active } = useAppSelector(selectUserData);
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetCollectionByIdQuery();

  const [activeTab, setActiveTab] = useState(collectionTabs[0]);

  // TODO maybe move to component
  const renderMessages = () => {
    switch (activeTab) {
      case collectionTabs[0]:
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
      case collectionTabs[1]:
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

  if (isLoading) {
    return (
      <BaseModal isOpen={true} closeModal={onClose}>
        <section className="colModal">
          <Loader variant="spinner" />
        </section>
      </BaseModal>
    );
  }

  return (
    <BaseModal isOpen={isOpen} closeModal={onClose}>
      <section className="colModal">
        <div className="colModal__messages mesg">
          <div className="mesg__tabs">
            <Tabs tabs={collectionTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
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

        {isSuccess && (
          <CollectionInfo data={data} isFavorite={isFavorite} handleClickFav={handleClickFav} />
        )}
      </section>
    </BaseModal>
  );
};

export default CollectionModal;
