import React from "react";
import "./socialIcon.scss";
import DiscordIcon from "@assets/icons/discord.svg";
import TwitterIcon from "@assets/icons/twitter.svg";
import LinkIcon from "@assets/icons/link.svg";
import { kFormatter } from "@utils/utils";

interface ISocialIconProps {
  community: "discord" | "twitter";
  number: number;
  link: string;
  showLinkIcon: boolean;
}

const SocialIcon = ({ community, number, link, showLinkIcon }: ISocialIconProps) => {
  return (
    <div className="socialIcon">
      {community === "discord" && <DiscordIcon />}
      {community === "twitter" && <TwitterIcon />}

      <p>{kFormatter(number)}</p>

      {showLinkIcon && (
        <a href={link} target="_blank" rel="noreferrer">
          <LinkIcon />
        </a>
      )}
    </div>
  );
};

export default SocialIcon;
