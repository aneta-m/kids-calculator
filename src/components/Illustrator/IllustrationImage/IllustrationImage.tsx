import React, { useRef } from "react";
import styles from "./IllustrationImage.module.scss";
import primaryImage from "../../../images/red_apple.png";
import secondaryImage from "../../../images/green_apple.png";
import subtractImage from "../../../images/apple_core.png";

type Props = { type: ImageType; width: number };

const IllustrationImage = ({ type, width }: Props) => {
    const dynamicStyle: { [key: string]: React.CSSProperties } = {
        image: {
            width: `${width}px`
        }
    };
    const ref = useRef<any>();

    let imageSource;
    let transparent = false;
    switch (type) {
        case "primary":
            imageSource = primaryImage;
            break;
        case "secondary":
            imageSource = secondaryImage;
            break;
        case "subtract":
            imageSource = subtractImage;
            break;
        case "transparent-subtract":
            imageSource = subtractImage;
            transparent = true;
            break;
        default:
            imageSource = primaryImage;
    }

    return (
        <div style={dynamicStyle.image} className={styles.container}>
            <img
                src={imageSource}
                alt="apple"
                className={`${styles.image} ${
                    transparent ? styles.transparent : ""
                }`}
                ref={ref}
            />
        </div>
    );
};

export default IllustrationImage;
