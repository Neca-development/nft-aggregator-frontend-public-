import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./messageItemSkeleton.module.scss";

export default function MessageItemSkeleton(props) {
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 600 100"
      backgroundColor="#3a315b"
      foregroundColor="#2a2642"
      className={styles.skeleton}
      {...props}
    >
      <rect x="48" y="8" rx="4" ry="4" width="180" height="22" />
      <rect x="238" y="8" rx="4" ry="4" width="50" height="22" />
      <circle cx="20" cy="20" r="20" />
      <rect x="0" y="52" rx="4" ry="4" width="600" height="46" />
    </ContentLoader>
  );
}
