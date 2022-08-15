import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./collectionItemSkeleton.module.scss";

const CollectionItemSkeleton = () => {
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 1075 40"
      backgroundColor="#1a132e"
      foregroundColor="#2a2642"
      className={styles.skeleton}
    >
      <rect x="0" y="0" rx="4" ry="4" width="40" height="40" />
      <rect x="62" y="10" rx="0" ry="0" width="280" height="22" />
      <rect x="370" y="10" rx="0" ry="0" width="110" height="22" />
      <rect x="520" y="10" rx="0" ry="0" width="90" height="22" />
      <rect x="650" y="10" rx="0" ry="0" width="90" height="22" />
      <rect x="775" y="10" rx="0" ry="0" width="90" height="22" />
      <rect x="910" y="10" rx="0" ry="0" width="90" height="22" />
    </ContentLoader>
  );
};

export default CollectionItemSkeleton;
