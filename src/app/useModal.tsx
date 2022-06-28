import React, { useCallback, useRef, useState } from "react";
import BaseModal from "../componenets/UI/BaseModal/BaseModal";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(
    (event: React.SyntheticEvent) => {
      event.stopPropagation();
      setIsShowing(!isShowing);
    },
    [isShowing]
  );

  const hookModal = useCallback(
    (children: React.ReactNode) => {
      return ReactDOM.createPortal(
        <CSSTransition
          in={isShowing}
          timeout={200}
          unmountOnExit
          classNames="modal"
          nodeRef={nodeRef}
        >
          <BaseModal closeModal={toggle} ref={nodeRef}>
            {children}
          </BaseModal>
        </CSSTransition>,
        document.getElementById("portal")
      );
    },
    [isShowing, toggle]
  );

  return { toggle, hookModal };
};
