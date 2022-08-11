import React, { useEffect, useState } from "react";
import "./header.scss";
import Logo from "@assets/icons/logo.svg";
import Button from "@UI/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useModal } from "@hooks/useModal";
import TransactionProcessingModal from "@components/TransactionProcessingModal/TransactionProcessingModal";
import { useAppSelector } from "@store/store.hook";
import { selectUserData } from "@store/state/userSlice";

function Header() {
  const { wallet, transactionState } = useAppSelector(selectUserData);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("/");
  const { toggle: openTransInProcessModal, hookModal } = useModal();

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

        {wallet ? (
          transactionState === "none" ? (
            <Button icon="profile" onClick={() => navigate("/profile")}>
              Profile
            </Button>
          ) : (
            <Button icon="profile" variant="gradient" onClick={openTransInProcessModal}>
              Transaction in progress
            </Button>
          )
        ) : (
          <Button icon="wallet" onClick={() => navigate("/profile")}>
            Log in
          </Button>
        )}

        {hookModal(<TransactionProcessingModal />)}
      </div>
    </header>
  );
}

export default Header;
