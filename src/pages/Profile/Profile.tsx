import React from "react";
import Button from "@UI/Button/Button";
import "./profile.scss";
import MetamaskIcon from "@assets/icons/metamask.svg";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@store/store.hook";
import { motion } from "framer-motion";
import { shortenAddress, useEthers } from "@usedapp/core";
import { clearUserState, selectUserData } from "@store/state/userSlice";
import EthereumIcon from "@UI/EthereumIcon/EthereumIcon";
import { useGetSubscriptionStateQuery } from "@services/payment.api";
import { userHasSignature } from "@utils/utils";
import { TransactionState } from "@models/payment.interface";

interface IProfileProps {
  buySubscription: () => void;
}

function Profile(props: IProfileProps) {
  const { buySubscription } = props;
  const { active, expiresAt, isLoggedIn, transactionState } = useAppSelector(selectUserData);
  const { account } = useEthers();
  const { isLoading, isError } = useGetSubscriptionStateQuery(null, {
    skip: !account && userHasSignature() === false,
  });
  const dispatch = useAppDispatch();
  const { activateBrowserWallet, deactivate } = useEthers();

  const convertExpireDate = (date: string) => {
    return dayjs(new Date(date)).format("DD.MM.YYYY");
  };

  const connectWallet = async () => {
    try {
      await activateBrowserWallet();
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    deactivate();
    dispatch(clearUserState());
    localStorage.removeItem("agAuth");
  };

  if (!isLoggedIn) {
    return (
      <motion.section
        className="container profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="profile__noMetamask">
          <p>Connect wallet to use the functionality of the service.</p>
          <button onClick={connectWallet}>
            MetaMask <MetamaskIcon />
          </button>

          {isLoading && (
            <div className="profile__error">
              <strong>Getting the account information...</strong>
            </div>
          )}
          {isError && (
            <div className="profile__error">
              <strong>Signature verification error</strong>
            </div>
          )}
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="container profile"
      initial={{ opacity: 0, translateY: -100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="profile__body">
        <div className="profile__wallet">
          <EthereumIcon />
          <p>{shortenAddress(account)}</p>
        </div>

        {active === true && (
          <div className="profile__expireBlock">
            <p>
              The action of your subscription will expire after:
              <span>{convertExpireDate(expiresAt)}</span>
            </p>
          </div>
        )}

        <h2>Buy a subscription to use the full functionality of the service</h2>
        <ul className="profile__points">
          <li>
            <span>1</span> View tweets from projects
          </li>
          <li>
            <span>2</span> Add more collections to your favorite
          </li>
          <li>
            <span>3</span> Access to announcements and giveaways page
          </li>
        </ul>
        <div className="profile__bottom">
          <p>Subscription cost: 0.03 ETH</p>
          {transactionState === TransactionState.pending ? (
            <Button variant="gradient" size="large">
              Sending transaction....
            </Button>
          ) : (
            <Button variant="gradient" size="large" onClick={buySubscription}>
              {active ? "Renew subscription" : "Buy a subscription"}
            </Button>
          )}
        </div>

        <div className="profile__disconnectBtn">
          <Button variant="primary" onClick={disconnectWallet}>
            Log out
          </Button>
        </div>
      </div>
    </motion.section>
  );
}

export default Profile;
