import React from "react";
import { IGaaMessage } from "@models/gaa";
import Button from "@UI/Button/Button";
import "./gaModal.scss";
import { formatDate } from "@utils/utils";

const GiveawayAnnounceModal = ({ message }: { message: IGaaMessage }) => {
  return (
    <section className="gaModal">
      <div className="gaModal__header">
        <img src={message.author.image} alt="" />
        <p>{message.author.name}</p>
        <span>{formatDate(message.createdAt)}</span>
        <Button variant="link" icon="link">
          {/* NEED MESSAGE LINK */}
          <a href="/" target="_blank" rel="noreferrer">
            View on Discord
          </a>
        </Button>
      </div>
      {message.channelType === "giveaway" && <h4 style={{ color: "#00B6A0" }}>Giveaway:</h4>}
      {message.channelType === "announcement" && (
        <h4 style={{ color: "#219CFB" }}>Announcement:</h4>
      )}
      <p className="gaModal__text">{message.text}</p>
    </section>
  );
};

export default GiveawayAnnounceModal;
