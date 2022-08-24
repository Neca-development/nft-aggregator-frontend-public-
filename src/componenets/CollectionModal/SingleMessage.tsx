import React from "react";
import "./collectionModal.scss";

import { formatDate } from "@utils/utils";
import useTextParser from "@hooks/useTextParser";

type SingleMessageProps = {
  avatar: string;
  name: string;
  createdAt: string;
  message: string;
};

const SingleMessage = React.forwardRef((props: SingleMessageProps, ref: any) => {
  const { avatar, name, createdAt, message } = props;
  const parsedMessage = useTextParser(message, {
    contentFrom: "twitter",
    className: "singleMessage__text",
    renderAs: "p",
  });

  return (
    <div className="mesg__item singleMessage" ref={ref}>
      <div className="singleMessage__header">
        <img src={avatar} alt="avatar" />
        <p>{name}</p>
        <span>{formatDate(createdAt)}</span>
      </div>
      {parsedMessage}
    </div>
  );
});

export default SingleMessage;
