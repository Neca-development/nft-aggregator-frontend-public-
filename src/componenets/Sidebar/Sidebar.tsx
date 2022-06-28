import React, { useState } from "react";
import Button from "../UI/Button/Button";
import RangeInput from "../UI/RangeInput/RangeInput";
import TextInput from "../UI/TextInput/TextInput";
import "./sidebar.scss";

interface ISidebarProps {
  page: "collections" | "giveaways";
  collectionMax: number;
  priceMax?: number;
  twitterMax?: number;
  discordMax: number;
  searchPlaceholder: string;
}

const Sidebar: React.FC<ISidebarProps> = ({
  page,
  collectionMax,
  priceMax,
  twitterMax,
  discordMax,
  searchPlaceholder,
}) => {
  const [collectionSizeFilter, setCollectionSizeFilter] = useState([0, collectionMax]);
  const [priceFilter, setPriceFilter] = useState([0, priceMax!]);
  const [twitterFolFilter, setTwitterFolFilter] = useState([0, twitterMax!]);
  const [discordFolFilter, setDiscordFolFilter] = useState([0, discordMax]);

  return (
    <aside className="sidebar">
      <TextInput placeholder={searchPlaceholder} />

      <div className="sidebar__ranges">
        <RangeInput
          name="Collection size"
          min={0}
          max={collectionMax}
          value={collectionSizeFilter}
          setValue={setCollectionSizeFilter}
          showEtherIcon={true}
        />

        {page === "collections" && (
          <>
            <RangeInput
              name="Floor Price"
              min={0}
              max={priceMax!}
              value={priceFilter}
              setValue={setPriceFilter}
              showEtherIcon={true}
            />
            <RangeInput
              name="Twitter Followers"
              min={0}
              max={twitterMax!}
              value={twitterFolFilter}
              setValue={setTwitterFolFilter}
              showEtherIcon={false}
            />
          </>
        )}

        <RangeInput
          name="Discord Members"
          min={0}
          max={discordMax}
          value={discordFolFilter}
          setValue={setDiscordFolFilter}
          showEtherIcon={false}
        />
      </div>

      <div className="sidebar__buttons">
        <Button>Apply</Button>
        <Button variant="secondary">Reset</Button>
      </div>
    </aside>
  );
};

export default Sidebar;
