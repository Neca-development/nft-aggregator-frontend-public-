import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/store.hook";
import Button from "@UI/Button/Button";
import "./infoModal.scss";
import { selectUserData } from "@store/state/userSlice";

interface IInfoModalProps {
  type: "no-subscription" | "reached-limit" | "expired";
}

const InfoModal = ({ type }: IInfoModalProps) => {
  const { wallet, hasSubscription } = useAppSelector(selectUserData);
  const navigate = useNavigate();

  const renderInfoModal = () => {
    switch (type) {
      case "no-subscription":
        return (
          <>
            <h3>To use this functionality, you need a subscription</h3>
            <p>
              Only users with a connected wallet and an active subscription to our service have
              access to the content of this page
            </p>
          </>
        );
      case "reached-limit":
        return (
          <>
            <h3>You have reached the free add to favorites limit</h3>
            <p>To add more collections to your favorites, purchase a subscription to our service</p>
          </>
        );
      case "expired":
        return (
          <>
            <h3>Unfortunately, your subscription has expired</h3>
            <p>
              To see all your collections from your favorites, purchase a subscription to our
              service
            </p>
          </>
        );
    }
  };

  return (
    <div className="infoModal">
      {renderInfoModal()}

      {wallet && hasSubscription === false ? (
        <Button size="large" variant="gradient" onClick={() => navigate("/profile")}>
          Buy Subscription
        </Button>
      ) : (
        <Button size="large">Connect Metamask</Button>
      )}
    </div>
  );
};

export default InfoModal;
