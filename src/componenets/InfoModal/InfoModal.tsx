import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Button from "../UI/Button/Button";
import "./infoModal.scss";

interface IInfoModalProps {
  type: "no-subscription" | "reached-limit" | "expired";
}

const InfoModal = ({ type }: IInfoModalProps) => {
  const { wallet, hasSubscription } = useAppSelector(state => state.user);
  const navigate = useNavigate();

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
      {!wallet && <Button size="large">Connect Metamask</Button>}
      {wallet && hasSubscription === false && (
        <Button size="large" variant="gradient" onClick={() => navigate("/profile")}>
          Buy Subscription
        </Button>
      )}
    </div>
  );
};

export default InfoModal;
