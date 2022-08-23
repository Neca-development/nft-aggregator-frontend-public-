import React, { useState } from "react";

import { ITwitterMessages } from "@models/messages.interface";
import { useLazyGetTwitterQuery } from "@services/messages.api";

import SingleMessage from "./SingleMessage";

type TwitterMessagesProps = {
  data: ITwitterMessages;
  handleMarkAsRead: () => void;
};

export default function TwitterMessages({ data, handleMarkAsRead }: TwitterMessagesProps) {
  const [localTwitter, setLocalTwitter] = useState<ITwitterMessages>(data);
  const [page, setPage] = useState(1);
  const [fetchTwitter, { data: paginatedData, isLoading }] = useLazyGetTwitterQuery();

  return (
    <>
      {localTwitter?.messages.length > 0 ? (
        <div onMouseEnter={handleMarkAsRead}>
          {localTwitter.messages.map(msg => (
            <SingleMessage
              key={msg.id}
              avatar={localTwitter.author.image}
              name={localTwitter.author.name}
              createdAt={msg.createdAt}
              message={msg.message}
            />
          ))}
        </div>
      ) : (
        <div className="noMessages">No messages from Twitter</div>
      )}
    </>
  );
}
