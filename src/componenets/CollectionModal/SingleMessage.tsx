import React from "react";
import "./collectionModal.scss";

import { formatDate } from "@utils/utils";
import TextParser from "@utils/TextParser";

type SingleMessageProps = {
  avatar: string;
  name: string;
  createdAt: string;
  message: string;
};

const SingleMessage = React.forwardRef((props: SingleMessageProps, ref: any) => {
  const { avatar, name, createdAt, message } = props;

  return (
    <div className="mesg__item singleMessage" ref={ref}>
      <div className="singleMessage__header">
        <img src={avatar} alt="avatar" />
        <p>{name}</p>
        <span>{formatDate(createdAt)}</span>
      </div>
      <TextParser renderAs="p" contentFrom="twitter" className="singleMessage__text">
        {message}
      </TextParser>
    </div>
  );
});

export default SingleMessage;
