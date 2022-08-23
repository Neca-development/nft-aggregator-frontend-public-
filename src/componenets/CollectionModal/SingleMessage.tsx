import React from "react";
import "./collectionModal.scss";
import Linkify from "react-linkify";

import { formatDate } from "@utils/utils";

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
      <Linkify>
        <p className="singleMessage__text">{message}</p>
      </Linkify>
    </div>
  );
});

export default SingleMessage;
