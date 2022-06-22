import React, { useState } from "react";
import Button from "../UI/Button/Button";
import RangeInput from "../UI/RangeInput/RangeInput";
import TextInput from "../UI/TextInput/TextInput";
import "./sidebar.scss";

const Sidebar = () => {
  // TODO maybe remade
  const [collectionSizeFilter, setCollectionSizeFilter] = useState([0, 500]);
  const [priceFilter, setPriceFilter] = useState([0, 6000]);
  const [twitterFolFilter, setTwitterFolFilter] = useState([0, 8000]);
  const [discordFolFilter, setDiscordFolFilter] = useState([0, 1500]);

  return (
    <aside className="sidebar">
      <TextInput placeholder="Collection name" />

      <div className="sidebar__ranges">
        <RangeInput
          name="Collection size"
          min={0}
          max={2500}
          value={collectionSizeFilter}
          setValue={setCollectionSizeFilter}
          showEtherIcon={true}
        />
        <RangeInput
          name="Floor Price"
          min={0}
          max={10000}
          value={priceFilter}
          setValue={setPriceFilter}
          showEtherIcon={true}
        />
        <RangeInput
          name="Twitter Followers"
          min={0}
          max={9999}
          value={twitterFolFilter}
          setValue={setTwitterFolFilter}
          showEtherIcon={false}
        />
        <RangeInput
          name="Discord Members"
          min={0}
          max={4000}
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
