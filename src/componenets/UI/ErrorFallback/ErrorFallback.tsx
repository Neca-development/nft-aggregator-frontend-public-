import React from "react";

import Button from "@UI/Button/Button";

import styles from "./errorFallback.module.scss";

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert" className={`container ${styles.wrapper}`}>
      <h2>Ooops, something went wrong :( </h2>
      <pre>{error.message}</pre>
      <Button onClick={() => window.location.assign(window.location.origin)}>Refresh</Button>
    </div>
  );
};

export default ErrorFallback;
