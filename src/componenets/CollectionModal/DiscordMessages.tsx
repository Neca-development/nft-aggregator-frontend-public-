import React, { useState } from "react";

import { IDiscordMessage } from "@models/messages.interface";
import { useLazyGetDiscordQuery } from "@services/messages.api";

import SingleMessage from "./SingleMessage";
import "./collectionModal.scss";

type DiscordMessagesProps = {
  data: IDiscordMessage[];
  handleMarkAsRead: () => void;
};

export default function DiscordMessages({ data, handleMarkAsRead }: DiscordMessagesProps) {
  const [localDiscord, setLocalDiscord] = useState<IDiscordMessage[]>(data);
  const [page, setPage] = useState(1);
  const [fetchDiscord, { data: paginatedData, isLoading }] = useLazyGetDiscordQuery();

  // TODO fetch items on scroll from page 1

  return (
    <>
      {localDiscord?.length > 0 ? (
        <div onClick={handleMarkAsRead}>
          {localDiscord.map(msg => (
            <SingleMessage
              key={msg.id}
              avatar={msg.author.image}
              name={msg.author.name}
              createdAt={msg.createdAt}
              message={msg.text}
            />
          ))}
        </div>
      ) : (
        <div className="noMessages">No messages from Discord</div>
      )}
    </>
  );
}
