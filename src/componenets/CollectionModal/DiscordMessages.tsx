import React, { useCallback, useEffect, useRef, useState } from "react";

import "./collectionModal.scss";
import { IDiscordMessage } from "@models/messages.interface";
import { useLazyGetDiscordQuery } from "@services/messages.api";
import MessageItemSkeleton from "@components/UI/MessageItemSkeleton/MessageItemSkeleton";

import SingleMessage from "./SingleMessage";

type DiscordMessagesProps = {
  data: IDiscordMessage[];
  handleMarkAsRead: () => void;
  collectionId: string;
};

export default function DiscordMessages({
  data,
  handleMarkAsRead,
  collectionId,
}: DiscordMessagesProps) {
  const [localDiscord, setLocalDiscord] = useState(data);
  const [page, setPage] = useState(1);
  const [fetchDiscord, { data: paginatedData, isLoading }] = useLazyGetDiscordQuery();
  const [totalPages, setTotalPages] = useState(1);

  const observer = useRef(null);

  const requestNextPage = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    fetchDiscord({ collectionId, page: newPage });
  }, [collectionId, fetchDiscord, page]);

  const lastElementRef = useCallback(
    (node: React.ReactNode) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && page < totalPages) {
          requestNextPage();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, page, requestNextPage, totalPages]
  );

  useEffect(() => {
    if (paginatedData) {
      setLocalDiscord(prev => [...prev, ...paginatedData.items]);
      setTotalPages(paginatedData.meta.totalPages);
    }
  }, [paginatedData]);

  return (
    <>
      {localDiscord?.length > 0 ? (
        <div onMouseEnter={handleMarkAsRead}>
          {localDiscord.map((msg, idx) => {
            if (localDiscord.length === idx + 1) {
              return (
                <SingleMessage
                  key={msg.id}
                  avatar={msg.author.image}
                  name={msg.author.name}
                  createdAt={msg.createdAt}
                  message={msg.text}
                  ref={lastElementRef}
                />
              );
            } else {
              return (
                <SingleMessage
                  key={msg.id}
                  avatar={msg.author.image}
                  name={msg.author.name}
                  createdAt={msg.createdAt}
                  message={msg.text}
                />
              );
            }
          })}
          {isLoading && <MessageItemSkeleton />}
        </div>
      ) : (
        <div className="noMessages">There are no messages in Discord</div>
      )}
    </>
  );
}
