import React from "react";
import { useState, MouseEvent } from "react";
import styles from "./AnimatedBorder.module.scss";

const AnimatedBorder = () => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = (event: MouseEvent) => {
        setIsActive((prevState) => !prevState);
    };

    return (
        <div
            onClick={handleClick}
            className={`${styles.animated_border} ${
                isActive ? styles.animated_border_active : ""
            }`}
        ></div>
    );
};

export default AnimatedBorder;
