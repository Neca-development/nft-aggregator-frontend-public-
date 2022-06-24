import React from "react";
import "./gain.scss";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";

const Gain = ({ change }: { change: number }) => {
  return (
    <>
      {change === 0 && <span className="gain">{change}%</span>}

      {change > 0 && (
        <span className="gain gain_positive">
          <img src={arrowUp} alt="change" />
          {change}%
        </span>
      )}

      {change < 0 && (
        <span className="gain gain_negative">
          <img src={arrowDown} alt="change" />
          {change.toString().slice(1)}%
        </span>
      )}
    </>
  );
};

export default Gain;
