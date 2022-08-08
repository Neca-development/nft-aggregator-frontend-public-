import React from "react";
import "./modal.scss";
import { motion } from "framer-motion";

interface IBaseModalProps {
  closeModal: (arg: React.SyntheticEvent) => void;
  children: React.ReactNode;
}

const BaseModal = React.forwardRef((props: IBaseModalProps, ref: any) => {
  const { closeModal, children } = props;

  return (
    <motion.div
      className="modal-overlay"
      onClick={closeModal}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="modal"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
      </motion.div>
    </motion.div>
  );
});

export default BaseModal;
