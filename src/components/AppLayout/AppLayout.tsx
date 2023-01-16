import React from "react";
import Overlay from "../Overlay/Overlay";
import styles from "./AppLayout.module.scss";

const AppLayout = ({ children }: { children: JSX.Element[] }) => {
    return (
        <>
            <div className={styles.app}>
                <div className={styles.flex_container}>
                    <div className={styles.side}>{children[0]}</div>
                    <div className={styles.main}>{children[1]}</div>
                </div>
            </div>
            <div className={styles.app_small_vertical}>
                <Overlay>
                    <p>Please rotate your device.</p>
                </Overlay>
            </div>
        </>
    );
};

export default AppLayout;
