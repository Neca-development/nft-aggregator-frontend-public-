import React from "react";
import "./rangeInput.scss";
import Slider from "rc-slider";
import etherIcon from "../../../assets/icons/Ethereum.svg";

interface IRangeInputProps {
  name: string;
  min: number;
  max: number;
  value: number[];
}

const RangeInput: React.FC<IRangeInputProps> = ({ name, min, max, value }) => {
  return (
    <div className="rangeInput">
      <span>{name}</span>

      <div className="rangeInput__numWrapper">
        <label className="rangeInput__num">
          <div className="rangeInput__ether">
            <span>{value[0]}</span>
            <img src={etherIcon} alt="" />
          </div>
          <input type="number" name="min" value={value[0]} readOnly />
        </label>

        <label className="rangeInput__num rangeInput__num_right">
          <div className="rangeInput__ether">
            <span>{value[1]}</span>
            <img src={etherIcon} alt="" />
          </div>
          <input type="number" name="min" value={value[1]} readOnly />
        </label>
      </div>

      <Slider range min={min} max={max} value={value} />
    </div>
  );
};

export default RangeInput;
