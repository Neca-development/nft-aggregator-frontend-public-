import React, { useEffect } from "react";
import "./modal.scss";
import { AnimatePresence, motion } from "framer-motion";
import Portal from "../Portal";

interface IBaseModalProps {
  closeModal: any;
  children: React.ReactNode;
  isOpen: boolean;
}

const BaseModal = React.forwardRef((props: IBaseModalProps, ref: any) => {
  const { closeModal, children, isOpen } = props;

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? closeModal() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [closeModal]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Portal wrapperId="modal-container">
      <AnimatePresence>
        {isOpen && (
          <div onClick={e => e.stopPropagation()}>
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
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
});

export default BaseModal;
