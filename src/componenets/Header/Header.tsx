import React, { useEffect, useState } from "react";
import "./header.scss";
import logo from "../../assets/icons/logo.svg";
import Button from "../UI/Button/Button";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useModal } from "../../app/useModal";
import TransactionProcessingModal from "../TransactionProcessingModal/TransactionProcessingModal";

const mockTransInProccess = true;

function Header() {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("/");
  const { toggle: openTransInProcModal, hookModal } = useModal();

  // Observe tab change to add styling
  useEffect(() => {
    if (location.pathname.match(/^\/$/)) {
      setCurrentTab("/");
    }
    if (location.pathname.match(/^\/favorite$/)) {
      setCurrentTab("/favorite");
    }
    if (location.pathname.match(/^\/giveaways$/)) {
      setCurrentTab("/giveaways");
    }
  }, [location]);

  return (
    <header className="header">
      <div className="container header__wrapper">
        <Link to="/" className="header__logo">
          <img src={logo} alt="HoarderNest" />
        </Link>
        <nav className="header__nav">
          <ul>
            <li
              className={classNames("header__navItem", {
                header__navItem_active: currentTab === "/",
              })}
            >
              <Link to="/">NFT Collections</Link>
            </li>
            <li
              className={classNames("header__navItem", {
                header__navItem_active: currentTab === "/favorite",
              })}
            >
              <Link to="/favorite">Favorite</Link>
            </li>
            <li
              className={classNames("header__navItem", {
                header__navItem_active: currentTab === "/giveaways",
              })}
            >
              <Link to="/giveaways">Giveaways and Announcements</Link>
            </li>
          </ul>
        </nav>
        <Button icon="wallet" onClick={openTransInProcModal}>
          Log in
        </Button>

        {hookModal(<TransactionProcessingModal />)}
      </div>
    </header>
  );
}

export default Header;
