import React from "react";
import styles from "./Grid.module.scss";

const Grid = ({
    cols,
    gap,
    children
}: {
    cols: number;
    gap: number;
    children: JSX.Element[];
}) => {
    const dynamicStyle: { [key: string]: React.CSSProperties } = {
        grid: {
            gridTemplateColumns: `repeat(${cols}, auto)`,
            gap: `${gap ? gap + "px" : "3%"}`
        }
    };

    return (
        <div style={dynamicStyle.grid} className={styles.grid}>
            {children}
        </div>
    );
};

export default Grid;
