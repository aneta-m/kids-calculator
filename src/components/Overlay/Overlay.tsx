import React from "react";
import styles from "./Overlay.module.scss";

const Overlay = ({ children }: { children: JSX.Element }) => {
    return <div className={styles.overlay}>{children}</div>;
};

export default Overlay;
