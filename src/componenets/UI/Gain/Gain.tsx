import React from "react";
import "./gain.scss";
import ArrowUp from "@assets/icons/arrow-up.svg";
import ArrowDown from "@assets/icons/arrow-down.svg";

const Gain = ({ change }: { change: number }) => {
  const formatChange = (change: number) => {
    if (+change === 0) {
      return 0;
    } else {
      return Math.abs(change).toFixed(3);
    }
  };

  if (+change === 0) {
    return <span className="gain">{formatChange(change)}%</span>;
  }

  if (+change > 0) {
    return (
      <span className="gain gain_positive">
        <ArrowUp />
        {formatChange(change)}%
      </span>
    );
  }

  if (+change < 0) {
    return (
      <span className="gain gain_negative">
        <ArrowDown />
        {formatChange(change)}%
      </span>
    );
  }
};

export default Gain;
