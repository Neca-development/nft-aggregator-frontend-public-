import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";
import "./tabs.scss";

interface ITabsProps {
  tabsArray: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const Tabs = ({ tabsArray, activeTab, setActiveTab }: ITabsProps) => {
  return (
    <div className="tabs">
      {tabsArray.map((tab: string, idx: number) => (
        <button
          key={idx}
          className={classNames("tabs__button", {
            tabs__button_active: activeTab === tab,
          })}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
