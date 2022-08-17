import React from "react";
import "./button.scss";
import classnames from "classnames";

interface IButtonProps {
  children: any;
  icon?: "wallet" | "profile" | "link";
  variant?: "primary" | "secondary" | "gradient" | "link";
  size?: "normal" | "large";
  onClick?: (arg?: any) => void;
  type?: "submit" | "button";
}

const Button = (props: IButtonProps) => {
  const { children, icon, variant, size, onClick, type = "button" } = props;
  return (
    <button
      className={classnames(
        "btn",
        { btn_secondary: variant === "secondary" },
        { btn_gradient: variant === "gradient" },
        { btn_link: variant === "link" },
        { btn_large: size === "large" }
      )}
      onClick={onClick}
      type={type}
    >
      {children}
      {icon === "wallet" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.66675 5V16.3333C1.66675 17.4379 2.56218 18.3333 3.66675 18.3333H16.3334C17.438 18.3333 18.3334 17.4379 18.3334 16.3333V7C18.3334 5.89543 17.438 5 16.3334 5H14.1667M1.66675 5V2.91667C1.66675 2.5 2.00008 1.66667 3.33341 1.66667C4.66675 1.66667 10.0001 1.66667 12.5001 1.66667C13.0556 1.66667 14.1667 1.91667 14.1667 2.91667C14.1667 3.91667 14.1667 4.72222 14.1667 5M1.66675 5H14.1667M13.3334 10C12.7779 10 11.6667 10.3333 11.6667 11.6667C11.6667 13 12.7779 13.3333 13.3334 13.3333C13.889 13.3333 15.0001 13 15.0001 11.6667C15.0001 10.3333 13.889 10 13.3334 10Z"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
      )}
      {icon === "link" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 1.5H14.5V5.5"
            stroke="#BA65FB"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14.5 1.5L9 7" stroke="#BA65FB" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M8.5 3H4C2.89543 3 2 3.89543 2 5V12C2 13.1046 2.89543 14 4 14H11C12.1046 14 13 13.1046 13 12V7.5"
            stroke="#BA65FB"
            strokeLinecap="round"
          />
        </svg>
      )}
      {icon === "profile" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.6668 17.5V15.8333C16.6668 14.9493 16.3156 14.1014 15.6905 13.4763C15.0654 12.8512 14.2176 12.5 13.3335 12.5H6.66683C5.78277 12.5 4.93493 12.8512 4.30981 13.4763C3.68469 14.1014 3.3335 14.9493 3.3335 15.8333V17.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99984 9.16667C11.8408 9.16667 13.3332 7.67428 13.3332 5.83333C13.3332 3.99238 11.8408 2.5 9.99984 2.5C8.15889 2.5 6.6665 3.99238 6.6665 5.83333C6.6665 7.67428 8.15889 9.16667 9.99984 9.16667Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default Button;
