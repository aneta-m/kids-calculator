import React, { useEffect, useState } from "react";
import styles from "./IllustratorLayout.module.scss";

const IllustratorLayout = ({
    variant,
    content,
    variant2,
    content2
}: {
    variant: IllustratorLayout;
    content: JSX.Element;
    variant2?: IllustratorLayout | null;
    content2?: JSX.Element;
}) => {
    function defineClasses(variantName: string) {
        return `${styles.container} ${styles[variantName]}`;
    }

    const [layoutDetails, setLayoutDetails] = useState({
        classes: defineClasses(variant),
        content: content
    });

    useEffect(() => {
        setLayoutDetails({ classes: defineClasses(variant), content: content });
        if (variant2 && content2) {
            setTimeout(() => {
                setLayoutDetails({
                    classes: defineClasses(variant2),
                    content: content2
                });
            }, 1000);
        }
    }, [variant, content, variant2, content2]);

    return <div className={layoutDetails.classes}>{layoutDetails.content}</div>;
};

export default IllustratorLayout;
