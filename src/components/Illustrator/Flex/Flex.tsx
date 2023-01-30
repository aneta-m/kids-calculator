import React from "react";
import styles from "./Flex.module.scss";

const Flex = ({
    height,
    width,
    children
}: {
    height: number;
    width: number;
    children: JSX.Element[];
}) => {
    return (
        <div
            style={{ width: width + "px", height: height + "px" }}
            className={styles.flex}
            data-testid="flex"
        >
            {children}
        </div>
    );
};

export default Flex;
