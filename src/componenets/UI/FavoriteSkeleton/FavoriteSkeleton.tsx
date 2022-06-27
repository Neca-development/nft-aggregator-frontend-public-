import React from "react";
import "./favSkeleton.scss";
import ContentLoader from "react-content-loader";

const FavoriteSkeleton = () => {
  return (
    <ContentLoader
      speed={1}
      viewBox="0 0 350 330"
      backgroundColor="#1a132e"
      foregroundColor="#2a2642"
      className="favSkeleton"
    >
      <rect x="0" y="0" rx="7" ry="7" width="350" height="164" />
      <circle cx="175" cy="165" r="30" />
      <rect x="16" y="213" rx="0" ry="0" width="230" height="22" />
      <rect x="16" y="250" rx="0" ry="0" width="310" height="22" />
      <rect x="16" y="285" rx="20" ry="20" width="320" height="40" />
    </ContentLoader>
  );
};

export default FavoriteSkeleton;
