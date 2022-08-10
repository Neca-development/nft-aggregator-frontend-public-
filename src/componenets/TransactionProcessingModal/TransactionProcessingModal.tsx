import BaseModal from "@components/UI/BaseModal/BaseModal";
import React from "react";
import "./transProcModal.scss";

interface ITransactionProcessingModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionProcessingModal = ({ isOpen, onClose }: ITransactionProcessingModalProps) => {
  return (
    <BaseModal isOpen={isOpen} closeModal={onClose}>
      <div className="transProcModal">
        <h3>Transaction processing</h3>
        <div>Some loader here...</div>
      </div>
    </BaseModal>
  );
};

export default TransactionProcessingModal;
