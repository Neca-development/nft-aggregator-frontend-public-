import React, { Dispatch, memo, SetStateAction } from "react";
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
  step: number;
}

const RangeInput: React.FC<IRangeInputProps> = ({
  name,
  min,
  max,
  value,
  showEtherIcon,
  setValue,
  step,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    const newValue = [...value];

    switch (inputName) {
      case "min":
        if (+inputValue > newValue[1]) {
          newValue[0] = newValue[1];
        } else {
          //@ts-ignore
          newValue[0] = inputValue;
        }
        break;
      case "max":
        if (+inputValue > max) {
          newValue[1] = max;
        } else {
          //@ts-ignore
          newValue[1] = inputValue;
        }
    }
    setValue(newValue);
  };

  const correctValuesOnBlur = () => {
    const newValue = [...value];
    //@ts-ignore
    if (newValue[0] === "") {
      newValue[0] = min;
      setValue(newValue);
    }
    //@ts-ignore
    if (newValue[1] === "") {
      newValue[1] = max;
      setValue(newValue);
    }
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
            value={value[0]}
            onChange={handleInputChange}
            step={step}
            onBlur={correctValuesOnBlur}
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
            value={value[1]}
            onChange={handleInputChange}
            style={showEtherIcon ? { paddingRight: "2rem" } : {}}
            onBlur={correctValuesOnBlur}
            step={step}
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
        step={step}
      />
    </div>
  );
};

export default memo(RangeInput);
