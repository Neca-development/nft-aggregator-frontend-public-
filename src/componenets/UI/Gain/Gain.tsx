import React, { useEffect, useState } from "react";

import "./gain.scss";
import ArrowUp from "@assets/icons/arrow-up.svg";
import ArrowDown from "@assets/icons/arrow-down.svg";

const Gain = ({ change }: { change: number | string }) => {
  const [value, setValue] = useState(0);

  const roundChange = (change: number | string) => {
    return +Number(change).toFixed(1);
  };

  useEffect(() => {
    setValue(roundChange(change));
  }, [change]);

  if (value === 0) {
    return <span className="gain">{value}%</span>;
  }

  if (value > 0) {
    return (
      <span className="gain gain_positive">
        <ArrowUp />
        {value}%
      </span>
    );
  }

  if (value < 0) {
    return (
      <span className="gain gain_negative">
        <ArrowDown />
        {Math.abs(value)}%
      </span>
    );
  }
};

export default Gain;
