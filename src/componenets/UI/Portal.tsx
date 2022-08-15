import React, { useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
  children: React.ReactNode;
  wrapperId: string;
}

const Portal = ({ children, wrapperId }: IPortalProps) => {
  const [wrapperElement, setWrapperElement] = useState(null);

  function createWrapperAndAppendToBody(wrapperId: string) {
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
  }

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }

    setWrapperElement(element);

    return () => {
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) {
    return null;
  }

  return ReactDOM.createPortal(children, wrapperElement);
};
export default Portal;
