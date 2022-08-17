import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import "./tabs.scss";

interface ITab {
  name: string;
  type: number;
}

interface ITabsProps {
  tabs: ITab[];
  activeTab: ITab;
  setActiveTab: Dispatch<SetStateAction<ITab>>;
}

const Tabs = ({ activeTab, setActiveTab, tabs }: ITabsProps) => {
  return (
    <div className="tabs">
      {tabs.map((tab: ITab, idx: number) => (
        <button
          key={idx}
          className={classNames("tabs__button", {
            tabs__button_active: activeTab === tab,
          })}
          onClick={() => setActiveTab(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
