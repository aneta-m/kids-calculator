import React from "react";
import styles from "./CardComment.module.scss";
import arrowIcon from "../../../../images/arrow_icon.png";

const CardComment = ({
    type,
    text
}: {
    type: "top" | "bottom";
    text: string;
}) => {
    return (
        <div className={`${styles.comment} ${styles["comment_" + type]}`}>
            <span className={styles.text}>{text}</span>
            <img
                src={arrowIcon}
                alt="arrow"
                className={`${styles.arrow_icon} ${
                    styles["arrow_icon_" + type]
                }`}
            />
        </div>
    );
};

export default CardComment;
