import React from "react";
import Button from "../../componenets/UI/Button/Button";
import "./profile.scss";
import metamaskIcon from "../../assets/icons/metamask.svg";
import dayjs from "dayjs";
import { useAppSelector } from "../../app/hooks";
import EthereumIcon from "../../componenets/UI/EthereumIcon/EthereumIcon";

function Profile() {
  const { wallet, subscriptionExpireDate, hasSubscription } = useAppSelector(state => state.user);

  const convertExpireDate = (date: string) => {
    return dayjs(new Date(date)).format("DD.MM.YYYY");
  };

  const displayWalletAddress = (address: string) => {
    return address.slice(0, 5) + "..." + address.slice(-4);
  };

  if (!wallet) {
    return (
      <section className="container profile">
        <div className="profile__noMetamask">
          <p>Connect wallet to use the functionality of the service.</p>
          <button>
            MetaMask <img src={metamaskIcon} alt="" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container profile">
      <div className="profile__body">
        <div className="profile__wallet">
          <EthereumIcon />
          <p>{displayWalletAddress(wallet)}</p>
        </div>

        {hasSubscription === true && (
          <div className="profile__expireBlock">
            <p>
              The action of your subscription will expire after:
              <span>{convertExpireDate(subscriptionExpireDate)}</span>
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
          {hasSubscription ? (
            <Button variant="gradient" size="large">
              Renew subscription
            </Button>
          ) : (
            <Button variant="gradient" size="large">
              Buy a subscription
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
