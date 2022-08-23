import React, { useEffect, useRef, useState } from "react";
import "./collectionModal.scss";
import { useNavigate } from "react-router-dom";

import Button from "@UI/Button/Button";
import Tabs, { ITab } from "@UI/Tabs/Tabs";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import BaseModal from "@components/UI/BaseModal/BaseModal";
import { useLazyGetCollectionByIdQuery } from "@services/collections.api";
import Loader from "@components/UI/Loader/Loader";
import { collectionTabs } from "@constants/constant";
import { useMarkDiscordMutation, useMarkTwitterMutation } from "@services/messages.api";

import CollectionInfo from "./CollectionInfo";
import DiscordMessages from "./DiscordMessages";
import TwitterMessages from "./TwitterMessages";

interface ICollectionModalProps {
  collectionId: string;
  isFavorite: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleClickFav: () => void;
  initialTab?: ITab;
  hideMessagesBadge?: (tab: "discord" | "twitter") => void;
}

const CollectionModal = ({
  collectionId,
  isFavorite,
  isOpen,
  onClose,
  handleClickFav,
  initialTab = collectionTabs[0],
  hideMessagesBadge,
}: ICollectionModalProps) => {
  const navigate = useNavigate();
  const { active } = useAppSelector(selectUserData);
  const [trigger, { data, isLoading, isSuccess }] = useLazyGetCollectionByIdQuery();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [markDiscordAsRead] = useMarkDiscordMutation();
  const [markTwitterAsRead] = useMarkTwitterMutation();

  const isDiscordRead = useRef(false);
  const isTwitterRead = useRef(false);

  const handleMarkAsRead = async () => {
    if (data.isFavorite === false) {
      return;
    }
    if (activeTab === collectionTabs[0] && isDiscordRead.current === false) {
      await markDiscordAsRead(collectionId);
      hideMessagesBadge && hideMessagesBadge("discord");
      isDiscordRead.current = true;
    }
    if (activeTab === collectionTabs[1] && isTwitterRead.current === false) {
      await markTwitterAsRead(collectionId);
      hideMessagesBadge && hideMessagesBadge("twitter");
      isTwitterRead.current = true;
    }
  };

  const renderMessages = () => {
    switch (activeTab) {
      case collectionTabs[0]:
        return (
          <DiscordMessages
            data={data.discordMessages}
            handleMarkAsRead={handleMarkAsRead}
            collectionId={collectionId}
          />
        );
      case collectionTabs[1]:
        return (
          <TwitterMessages
            data={data.twitter}
            handleMarkAsRead={handleMarkAsRead}
            collectionId={collectionId}
          />
        );
    }
  };

  useEffect(() => {
    if (isOpen) {
      trigger(collectionId);
    }
  }, [isOpen, collectionId, trigger]);

  useEffect(() => {
    if (isOpen && activeTab !== initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen]);

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
            {active && data ? (
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
