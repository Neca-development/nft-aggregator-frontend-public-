import React from "react";

import { GaaChannelTypes, IGaaMessage } from "@models/gaa";
import Button from "@UI/Button/Button";
import "./gaModal.scss";
import { formatDate } from "@utils/utils";
import BaseModal from "@components/UI/BaseModal/BaseModal";
import useTextParser from "@hooks/useTextParser";

interface IGiveawayAnnounceModalProps {
  message: IGaaMessage;
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  inviteLink: string;
}

const GiveawayAnnounceModal = ({
  message,
  isOpen,
  onClose,
  inviteLink,
}: IGiveawayAnnounceModalProps) => {
  const messageBlock = useTextParser(message.message, {
    renderAs: "p",
    className: "gaModal__text",
  });

  return (
    <BaseModal isOpen={isOpen} closeModal={onClose}>
      <section className="gaModal">
        <div className="gaModal__header">
          <img src={message.author.image} alt="" />
          <p>{message.author.name}</p>
          <span>{formatDate(message.createdAt)}</span>
          <Button variant="link" icon="link">
            <a href={inviteLink} target="_blank" rel="noreferrer">
              View on Discord
            </a>
          </Button>
        </div>
        {message.channelType === GaaChannelTypes.giveaways && (
          <h4 style={{ color: "#00B6A0" }}>Giveaway:</h4>
        )}
        {message.channelType === GaaChannelTypes.announcement && (
          <h4 style={{ color: "#219CFB" }}>Announcement:</h4>
        )}
        {/* <p className="gaModal__text">{message.message}</p> */}
        {messageBlock}
      </section>
    </BaseModal>
  );
};

export default GiveawayAnnounceModal;
