import React from "react";
import classNames from "classnames";
import "./tabs.scss";

const Tabs = ({ tabsArray, activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      {tabsArray.map((tab: string) => (
        <button
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
