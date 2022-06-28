import React from "react";
import "./modal.scss";

interface IBaseModalProps {
  closeModal: (arg: React.SyntheticEvent) => void;
  children: React.ReactNode;
}

const BaseModal = React.forwardRef((props: IBaseModalProps, ref: any) => {
  const { closeModal, children } = props;

  return (
    <div className="modal-overlay" onClick={closeModal} ref={ref}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {children}
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
});

export default BaseModal;
