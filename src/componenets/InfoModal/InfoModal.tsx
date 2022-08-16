import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/store.hook";
import Button from "@UI/Button/Button";
import "./infoModal.scss";
import { selectUserData } from "@store/state/userSlice";
import BaseModal from "@components/UI/BaseModal/BaseModal";

interface IInfoModalProps {
  type: "no-subscription" | "reached-limit" | "expired" | "no-signature";
  onClose: () => void;
  isOpen: boolean;
}

const InfoModal = ({ type, onClose, isOpen }: IInfoModalProps) => {
  const { active, isLoggedIn } = useAppSelector(selectUserData);
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
      case "no-signature":
        return (
          <>
            <h3>You have rejected the signature</h3>
            <p>
              Please confirm the signature or you will not be able to use the full features of the
              application. Connect your MetaMask wallet again
            </p>
          </>
        );
    }
  };

  const closeAndNavigateToProfile = () => {
    navigate("/profile");
    onClose();
  };

  return (
    <BaseModal closeModal={onClose} isOpen={isOpen}>
      <div className="infoModal">
        {renderInfoModal()}

        {isLoggedIn && active === false ? (
          <Button size="large" variant="gradient" onClick={closeAndNavigateToProfile}>
            Buy Subscription
          </Button>
        ) : (
          <Button size="large" onClick={closeAndNavigateToProfile}>
            Connect Metamask
          </Button>
        )}
      </div>
    </BaseModal>
  );
};

export default InfoModal;
