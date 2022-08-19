import React from "react";
import { motion } from "framer-motion";

import Logo from "@assets/icons/logo-icon.svg";

import styles from "./loader.module.scss";

interface ILoaderProps {
  variant: "spinner" | "logo";
}

const loaderVariants = {
  logo: {
    scale: [1, 1.1],
    transition: {
      scale: {
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
      },
    },
  },
  text: {
    color: ["#9992b9", "#fff"],
    transition: {
      color: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.6,
      },
    },
  },
};

const Loader = ({ variant }: ILoaderProps) => {
  return (
    <div className={styles.wrapper}>
      {variant === "spinner" && <div className={styles.loader}></div>}
      {variant === "logo" && (
        <motion.div variants={loaderVariants} animate="logo" className={styles.logo}>
          <Logo />
        </motion.div>
      )}

      <motion.span variants={loaderVariants} animate="text">
        Loading...
      </motion.span>
    </div>
  );
};

export default Loader;
