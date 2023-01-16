import React, { useEffect, useRef } from "react";
import styles from "./Button.module.scss";

const Button = ({
    value,
    displayValue,
    type,
    onClick
}: {
    value: string;
    displayValue?: string;
    type?: "operator" | "result" | "backspace" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const classes = `${styles.button} ${type ? ` ${styles[type]}` : ""}`;

    function simulateClick(button: HTMLButtonElement) {
        button.dispatchEvent(
            new MouseEvent("click", {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        );
        button.classList.add(styles.focused);
    }

    function simulateMouseLeave() {
        buttonRef.current!.classList.remove(styles.focused);
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            let eventKey;
            switch (event.key) {
                case "Enter":
                    eventKey = "=";
                    break;
                case "c":
                    eventKey = "C";
                    break;
                case "Delete":
                    eventKey = "Backspace";
                    break;
                case "x":
                    eventKey = "*";
                    break;
                default:
                    eventKey = event.key;
            }
            if (eventKey === value) {
                simulateClick(buttonRef.current!);
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("keyup", simulateMouseLeave);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
            document.removeEventListener("keyup", simulateMouseLeave);
        };
    });

    return (
        <button
            ref={buttonRef}
            value={value}
            className={classes}
            onClick={onClick}
        >
            {displayValue || value}
        </button>
    );
};

export default Button;
