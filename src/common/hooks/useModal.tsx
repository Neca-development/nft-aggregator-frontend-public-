import React, { useCallback, useRef, useState } from "react";
import BaseModal from "@UI/BaseModal/BaseModal";
import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";
import { AnimatePresence } from "framer-motion";

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
      const portalElement = document.getElementById("portal")!;

      return ReactDOM.createPortal(
        // <CSSTransition
        //   in={isShowing}
        //   timeout={200}
        //   unmountOnExit
        //   classNames="modal"
        //   nodeRef={nodeRef}
        // >
        <AnimatePresence>
          {isShowing && (
            <BaseModal closeModal={toggle} ref={nodeRef}>
              {children}
            </BaseModal>
          )}
        </AnimatePresence>,
        // </CSSTransition>,
        portalElement
      );
    },
    [toggle, isShowing]
  );

  return { toggle, hookModal };
};
