import React from "react";
import styles from "./Description.module.scss";

const Description = ({ state, size }: { state: OperationData; size?: "l" }) => {
    let { number1, operator, number2, result } = state;

    const resultNumber = Number(result);
    let equalSign = "=";
    let decimal = "0";
    let resultWithRemainder;
    const isResultDecimal =
        !Number.isInteger(resultNumber) &&
        !Number.isNaN(resultNumber) &&
        Number.isFinite(resultNumber);

    const getNumberOfDigitsAfterPoint = (value: number) => {
        if (Number.isInteger(value)) {
            return 0;
        }
        decimal = value.toString().split(".")[1];
        return decimal.length;
    };

    if (isResultDecimal) {
        resultWithRemainder = `${
            resultNumber > 0
                ? Math.floor(resultNumber)
                : Math.ceil(resultNumber)
        }, remainder: ${Number(number1) % Number(number2)}`;
        const decimalDigitsNumber = getNumberOfDigitsAfterPoint(resultNumber);
        if (decimalDigitsNumber > 2) {
            equalSign = "≈";
            result = resultNumber.toFixed(2).toString();
        }
    }

    return size === "l" ? (
        <div className={`${styles.description_l}`}>
            {number1 && <span>{number1}</span>}
            {operator && <span>{` ${operator}`}</span>}
            {number2 && <span>{` ${number2}`}</span>}
            {result && (
                <>
                    <span> = </span>
                    <span>
                        {isResultDecimal && operator === "/"
                            ? resultWithRemainder
                            : result}
                    </span>
                </>
            )}
        </div>
    ) : (
        <div className={`${styles.description}`}>
            {`${number1 && number1} ${operator ? operator : ""} ${
                number2 ? number2 : ""
            } ${result ? `${equalSign} ${result}` : ""}`}
        </div>
    );
};

export default Description;
