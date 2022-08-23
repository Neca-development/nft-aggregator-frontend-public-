import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./gaaItemSkeleton.module.scss";

export default function GaaItemSkeleton(props) {
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 340 450"
      backgroundColor="#1a132e"
      foregroundColor="#2a2642"
      className={styles.skeleton}
      {...props}
    >
      <rect x="0" y="266" rx="4" ry="4" width="340" height="112" />
      <rect x="0" y="200" rx="4" ry="4" width="280" height="52" />
      <rect x="0" y="0" rx="7" ry="7" width="340" height="160" />
      <circle cx="170" cy="160" r="30" />
      <rect x="0" y="405" rx="20" ry="20" width="340" height="40" />
    </ContentLoader>
  );
}
