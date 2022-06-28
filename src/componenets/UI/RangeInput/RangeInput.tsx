import React, { Dispatch, SetStateAction } from "react";
import "./rangeInput.scss";
import Slider from "rc-slider";
import EthereumIcon from "../EthereumIcon/EthereumIcon";

interface IRangeInputProps {
  name: string;
  min: number;
  max: number;
  value: number[];
  setValue: Dispatch<SetStateAction<number[]>>;
  showEtherIcon: boolean;
}

const RangeInput: React.FC<IRangeInputProps> = ({
  name,
  min,
  max,
  value,
  showEtherIcon,
  setValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = +e.target.value;
    const inputName = e.target.name;
    const newValue = [...value];

    switch (inputName) {
      case "min":
        if (inputValue > newValue[1]) {
          newValue[0] = newValue[1];
        } else {
          newValue[0] = inputValue;
        }
        break;
      case "max":
        if (inputValue > max) {
          newValue[1] = max;
        } else {
          newValue[1] = inputValue;
        }
    }
    setValue(newValue);
  };

  const correctValuesOnBlur = () => {
    const newValue = [...value];
    if (newValue[1] < newValue[0]) {
      newValue.reverse();
      setValue(newValue);
    }
  };

  return (
    <div className="rangeInput">
      <span>{name}</span>

      <div className="rangeInput__numWrapper">
        <label className="rangeInput__num">
          {showEtherIcon && (
            <div className="rangeInput__ether">
              <span>{value[0]}</span>
              <EthereumIcon />
            </div>
          )}
          <input
            type="number"
            name="min"
            min={min}
            max={max}
            value={value[0].toString()}
            onChange={handleInputChange}
          />
        </label>

        <label className="rangeInput__num rangeInput__num_right">
          {showEtherIcon && (
            <div className="rangeInput__ether">
              <span>{value[1]}</span>
              <EthereumIcon />
            </div>
          )}
          <input
            type="number"
            name="max"
            min={min}
            max={max}
            value={value[1].toString()}
            onChange={handleInputChange}
            style={showEtherIcon ? { paddingRight: "2rem" } : {}}
            onBlur={correctValuesOnBlur}
          />
        </label>
      </div>

      <Slider
        range
        min={min}
        max={max}
        value={value}
        //@ts-ignore
        onChange={(val: number[]) => setValue(val)}
      />
    </div>
  );
};

export default RangeInput;
