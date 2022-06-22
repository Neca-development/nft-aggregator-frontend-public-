import React from "react";
import "./header.scss";
import logo from "../../assets/icons/logo.svg";
import Button from "../UI/Button/Button";

function Header() {
  return (
    <header className="header">
      <div className="container header__wrapper">
        <a href="/" className="header__logo">
          <img src={logo} alt="HoarderNest" />
        </a>
        <nav className="header__nav">
          <ul>
            <li className="header__navItem header__navItem_active">NFT Collections</li>
            <li className="header__navItem">Favorite</li>
            <li className="header__navItem">Giveaways and Announcements</li>
          </ul>
        </nav>
        <Button icon="wallet">Log in</Button>
      </div>
    </header>
  );
}

export default Header;
