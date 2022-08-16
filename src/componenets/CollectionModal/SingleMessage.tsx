import { formatDate } from "@utils/utils";
import React from "react";
import "./collectionModal.scss";
import Linkify from "react-linkify";

const SingleMessage = ({ avatar, name, createdAt, message }) => {
  return (
    <div className="mesg__item singleMessage">
      <div className="singleMessage__header">
        <img src={avatar} alt="avatar" />
        <p>{name}</p>
        <span>{formatDate(createdAt)}</span>
      </div>
      <Linkify>
        <p className="singleMessage__text">{message}</p>
      </Linkify>
    </div>
  );
};

export default SingleMessage;
