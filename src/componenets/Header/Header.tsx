import React, { useEffect, useState } from "react";
import "./header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import Logo from "@assets/icons/logo.svg";
import Button from "@UI/Button/Button";
import TransactionProcessingModal from "@components/TransactionProcessingModal/TransactionProcessingModal";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";
import { TransactionState } from "@models/payment.interface";

function Header() {
  const { transactionState, isLoggedIn } = useAppSelector(selectUserData);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("/");
  const [showTransInProcessModal, setShowTransInProcessModal] = useState(false);

  const renderProfileBtn = () => {
    if (isLoggedIn && transactionState === TransactionState.pending) {
      return (
        <Button icon="profile" variant="gradient" onClick={() => setShowTransInProcessModal(true)}>
          Transaction in progress
        </Button>
      );
    } else if (isLoggedIn) {
      return (
        <Button icon="profile" onClick={() => navigate("/profile")}>
          Profile
        </Button>
      );
    } else {
      return (
        <Button icon="wallet" onClick={() => navigate("/profile")}>
          Log in
        </Button>
      );
    }
  };

  // Observe tab change to add styling
  useEffect(() => {
    if (location.pathname.match(/^\/$/)) {
      setCurrentTab("/");
    } else if (location.pathname.match(/^\/favorite$/)) {
      setCurrentTab("/favorite");
    } else if (location.pathname.match(/^\/giveaways$/)) {
      setCurrentTab("/giveaways");
    } else {
      setCurrentTab("");
    }
  }, [location]);

  return (
    <header className="header">
      <div className="container header__wrapper">
        <Link to="/" className="header__logo">
          <Logo />
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

        {renderProfileBtn()}

        <TransactionProcessingModal
          isOpen={showTransInProcessModal}
          onClose={() => setShowTransInProcessModal(false)}
        />
      </div>
    </header>
  );
}

export default Header;
