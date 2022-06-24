import React from "react";
import "./itemBannerBlock.scss";

const ItemBannerBlock = ({ banner, logo }: { banner: string; logo: string }) => {
  return (
    <div className="itemBannerBlock">
      <img src={banner} alt="" className="itemBannerBlock__bg" />
      <img src={logo} alt="" className="itemBannerBlock__logo" />
    </div>
  );
};

export default ItemBannerBlock;
