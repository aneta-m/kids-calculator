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
    let alt;

    switch (type) {
        case "primary":
            imageSource = primaryImage;
            alt = "red apple";
            break;
        case "secondary":
            imageSource = secondaryImage;
            alt = "green apple";
            break;
        case "subtract":
            imageSource = subtractImage;
            alt = "apple core";
            break;
        case "transparent-subtract":
            imageSource = subtractImage;
            transparent = true;
            alt = "disappearing apple core";
            break;
        default:
            imageSource = primaryImage;
            alt = "apple";
    }

    return (
        <div
            style={dynamicStyle.image}
            className={styles.container}
            data-testid="image-container"
        >
            <img
                src={imageSource}
                alt={alt}
                className={`${styles.image} ${
                    transparent ? styles.transparent : ""
                }`}
                ref={ref}
            />
        </div>
    );
};

export default IllustrationImage;
