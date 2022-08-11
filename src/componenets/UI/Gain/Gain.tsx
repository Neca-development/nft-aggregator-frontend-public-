import React from "react";
import "./gain.scss";
import ArrowUp from "@assets/icons/arrow-up.svg";
import ArrowDown from "@assets/icons/arrow-down.svg";

const Gain = ({ change }: { change: number }) => {
  if (change === 0) {
    return <span className="gain">{change}%</span>;
  }

  if (change > 0) {
    return (
      <span className="gain gain_positive">
        <ArrowUp />
        {change}%
      </span>
    );
  }

  if (change < 0) {
    return (
      <span className="gain gain_negative">
        <ArrowDown />
        {change.toString().slice(1)}%
      </span>
    );
  }
};

export default Gain;
