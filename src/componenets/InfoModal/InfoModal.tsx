import React from "react";
import Button from "../UI/Button/Button";
import "./infoModal.scss";

interface IInfoModalProps {
  type: "no-subscription" | "reached-limit" | "expired";
}

const tempMetamaskConnected = true;
const tempUserHasSubs = false;

const InfoModal = ({ type }: IInfoModalProps) => {
  return (
    <div className="infoModal">
      {type === "no-subscription" && (
        <>
          <h3>To use this functionality, you need a subscription</h3>
          <p>
            Only users with a connected wallet and an active subscription to our service have access
            to the content of this page
          </p>
        </>
      )}
      {type === "reached-limit" && (
        <>
          <h3>You have reached the free add to favorites limit</h3>
          <p>To add more collections to your favorites, purchase a subscription to our service</p>
        </>
      )}
      {type === "expired" && (
        <>
          <h3>Unfortunately, your subscription has expired</h3>
          <p>
            To see all your collections from your favorites, purchase a subscription to our service
          </p>
        </>
      )}
      {/* @ts-ignore */}
      {tempMetamaskConnected === false && <Button size="large">Connect Metamask</Button>}
      {tempMetamaskConnected === true && tempUserHasSubs === false && (
        <Button size="large" variant="gradient">
          Buy Subscription
        </Button>
      )}
    </div>
  );
};

export default InfoModal;
