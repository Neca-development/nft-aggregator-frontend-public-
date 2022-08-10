import React, { useCallback, useRef, useState } from "react";
import BaseModal from "@UI/BaseModal/BaseModal";
import ReactDOM from "react-dom";
import { AnimatePresence } from "framer-motion";

// !!! UNSTABLE, BETTER USE <PORTAL> COMPONENT

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    // event.stopPropagation();
    setIsShowing(!isShowing);
  }, [isShowing]);

  const hookModal = useCallback(
    (children: React.ReactNode) => {
      const portalElement = document.getElementById("portal")!;

      return ReactDOM.createPortal(
        <AnimatePresence>
          {isShowing && (
            <BaseModal closeModal={toggle} ref={nodeRef} isOpen={isShowing}>
              {children}
            </BaseModal>
          )}
        </AnimatePresence>,
        portalElement
      );
    },
    [toggle, isShowing]
  );

  return { toggle, hookModal };
};
