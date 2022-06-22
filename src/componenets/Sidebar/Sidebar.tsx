import React from "react";
import Button from "../UI/Button/Button";
import RangeInput from "../UI/RangeInput/RangeInput";
import TextInput from "../UI/TextInput/TextInput";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <TextInput placeholder="Collection name" />

      <div className="sidebar__ranges">
        <RangeInput name="Collection size" min={0} max={2500} value={[0, 1000]} />
        <RangeInput name="Floor Price" min={0} max={10000} value={[0, 10000]} />
        <RangeInput name="Twitter Followers" min={0} max={9999} value={[0, 6000]} />
        <RangeInput name="Discord Members" min={0} max={4000} value={[0, 1000]} />
      </div>

      <div className="sidebar__buttons">
        <Button>Apply</Button>
        <Button variant="secondary">Reset</Button>
      </div>
    </aside>
  );
};

export default Sidebar;
