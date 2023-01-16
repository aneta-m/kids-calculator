import React from "react";
import styles from "./Card.module.scss";
import CardComment from "./CardComment/CardComment";

const Card = ({
    padding,
    variant,
    comment,
    children
}: {
    padding?: string;
    variant?: string;
    comment?: { type: "top" | "bottom"; text: string };
    children: JSX.Element | JSX.Element[];
}) => {
    const classes = `${styles.card} ${variant ? styles[variant] : ""} ${
        comment ? styles.has_comment : ""
    }`;
    return (
        <div
            style={padding ? { padding: padding } : undefined}
            className={classes}
        >
            {children}
            {comment && (
                <div className={styles[`comment_wrapper_${comment.type}`]}>
                    <CardComment type={comment.type} text={comment.text} />
                </div>
            )}
        </div>
    );
};

export default Card;
