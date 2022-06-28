import React from "react";
import "./gain.scss";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";

const Gain = ({ change }: { change: number }) => {
  if (change === 0) {
    return <span className="gain">{change}%</span>;
  }

  if (change > 0) {
    return (
      <span className="gain gain_positive">
        <img src={arrowUp} alt="change" />
        {change}%
      </span>
    );
  }

  if (change < 0) {
    return (
      <span className="gain gain_negative">
        <img src={arrowDown} alt="change" />
        {change.toString().slice(1)}%
      </span>
    );
  }
};

export default Gain;
