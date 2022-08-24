import React from "react";
import { useNavigate } from "react-router-dom";

import BaseModal from "@components/UI/BaseModal/BaseModal";
import "./transProcModal.scss";
import Button from "@components/UI/Button/Button";

interface ITransactionProcessingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionProcessingModal = ({ isOpen, onClose }: ITransactionProcessingModalProps) => {
  const navigate = useNavigate();

  const closeAndNavigate = () => {
    onClose();
    navigate("/profile");
  };

  return (
    <BaseModal isOpen={isOpen} closeModal={onClose}>
      <div className="transProcModal">
        <h3>Transaction processing</h3>
        <Button size="large" onClick={closeAndNavigate}>
          Profile
        </Button>
      </div>
    </BaseModal>
  );
};

export default TransactionProcessingModal;
