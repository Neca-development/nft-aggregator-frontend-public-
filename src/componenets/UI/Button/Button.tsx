import React from "react";
import "./button.scss";
import walletImg from "../../../assets/icons/wallet.svg";
import classnames from "classnames";

interface IButtonProps {
  children: any;
  icon?: "wallet" | "profile";
  variant?: "primary" | "secondary";
  size?: "normal" | "large";
}

const Button = (props: IButtonProps) => {
  const { children, icon, variant, size } = props;
  return (
    <button
      className={classnames(
        "btn",
        { btn_secondary: variant === "secondary" },
        { btn_large: size === "large" }
      )}
    >
      {children}
      {icon === "wallet" && <img src={walletImg} alt="wallet" />}
    </button>
  );
};

export default Button;
