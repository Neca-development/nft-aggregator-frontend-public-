import React from "react";
import "./textInput.scss";

const TextInput = ({ placeholder }: { placeholder: string }) => {
  return (
    <label className="textInput">
      <input type="text" name="search" placeholder={placeholder} />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2.25 2.25 19.5 19.5">
        <path
          d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
          stroke="#9992B9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 21L16.65 16.65"
          stroke="#9992B9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
};

export default TextInput;
