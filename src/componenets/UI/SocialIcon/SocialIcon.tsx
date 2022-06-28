import React from "react";
import "./socialIcon.scss";
import discordIcon from "../../../assets/icons/discord.svg";
import twitterIcon from "../../../assets/icons/twitter.svg";
import { kFormatter } from "../../../app/utils";
import linkIcon from "../../../assets/icons/link.svg";

interface ISocialIconProps {
  community: "discord" | "twitter";
  number: number;
  link: string;
  showLinkIcon: boolean;
}

const SocialIcon = ({ community, number, link, showLinkIcon }: ISocialIconProps) => {
  return (
    <div className="socialIcon">
      {community === "discord" && <img src={discordIcon} alt="discord" />}
      {community === "twitter" && <img src={twitterIcon} alt="discord" />}

      <p>{kFormatter(number)}</p>

      {showLinkIcon && (
        <a href={link} target="_blank" rel="noreferrer">
          <img src={linkIcon} alt="" />
        </a>
      )}
    </div>
  );
};

export default SocialIcon;
