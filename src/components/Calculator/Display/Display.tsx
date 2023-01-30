import React from "react";
import styles from "./Display.module.scss";

const Display = ({ value }: { value: string }) => {
    const isValueInfinite = value.includes("Infinity");

    return isValueInfinite ? (
        <p className={`${styles.display} ${styles.warning}`} role="alert">
            You cannot divide by 0!
        </p>
    ) : (
        <p className={styles.display}>{value}</p>
    );
};

export default Display;
