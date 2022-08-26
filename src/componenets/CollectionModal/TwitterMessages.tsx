import React, { useCallback, useEffect, useRef, useState } from "react";

import { ITwitterMessages } from "@models/messages.interface";
import { useLazyGetTwitterQuery } from "@services/messages.api";
import MessageItemSkeleton from "@components/UI/MessageItemSkeleton/MessageItemSkeleton";

import SingleMessage from "./SingleMessage";

type TwitterMessagesProps = {
  data: ITwitterMessages;
  handleMarkAsRead: () => void;
  collectionId: string;
};

export default function TwitterMessages({
  data,
  handleMarkAsRead,
  collectionId,
}: TwitterMessagesProps) {
  const [localTwitter, setLocalTwitter] = useState(data);
  const [page, setPage] = useState(0);
  const [fetchTwitter, { data: paginatedData, isLoading }] = useLazyGetTwitterQuery();
  const [totalPages, setTotalPages] = useState(1);

  const observer = useRef(null);

  const requestNextPage = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    fetchTwitter({ collectionId, page: newPage });
  }, [collectionId, fetchTwitter, page]);

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
      setLocalTwitter(prev => ({ ...prev, messages: [...prev.messages, ...paginatedData.items] }));
      setTotalPages(paginatedData.meta.totalPages);
    }
  }, [paginatedData]);

  return (
    <>
      {localTwitter?.messages.length > 0 ? (
        <div onMouseEnter={handleMarkAsRead}>
          {localTwitter.messages.map((msg, idx) => {
            if (localTwitter.messages.length === idx + 1) {
              return (
                <SingleMessage
                  key={msg.id}
                  avatar={localTwitter.author.image}
                  name={localTwitter.author.name}
                  createdAt={msg.createdAt}
                  message={msg.message}
                  contentFrom="twitter"
                  ref={lastElementRef}
                />
              );
            } else {
              return (
                <SingleMessage
                  key={msg.id}
                  avatar={localTwitter.author.image}
                  name={localTwitter.author.name}
                  createdAt={msg.createdAt}
                  message={msg.message}
                  contentFrom="twitter"
                />
              );
            }
          })}
          {isLoading && <MessageItemSkeleton />}
        </div>
      ) : (
        <div className="noMessages">There are no messages in Twitter</div>
      )}
    </>
  );
}
