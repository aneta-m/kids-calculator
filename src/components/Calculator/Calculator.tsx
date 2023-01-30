import React from "react";
import styles from "./Calculator.module.scss";
import Button from "./Button/Button";
import Display from "./Display/Display";
import { digits, operators } from "../../utils";
import Description from "./Description/Description";

const Calculator = ({
    onChange,
    number1,
    number2,
    operator,
    result,
    stage
}: {
    onChange: (updatedData: Partial<OperationData>) => void;
    number1: string | null;
    number2: string | null;
    operator: string | null;
    result: string | null;
    stage: OperationStage;
}) => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;
        updateCalculator(value);
        e.currentTarget.blur();
    };

    const updateCalculator = (value: string) => {
        if (digits.includes(value)) {
            handleNumberInput(value, stage);
        }
        if (operators.includes(value)) {
            handleOperatorInput(value, stage);
        }
        if (value === "Backspace") {
            handleBackspace(stage);
        }
        if (value === "=") {
            getResult(stage);
        }
        if (value === "C") {
            resetValues();
        }
    };

    const handleNumberInput = (value: string, stage: OperationStage) => {
        if (stage === "firstNumber" && number1) {
            if (number1.length >= 3) {
                return;
            }
            let newNumber =
                number1 === "0" || number1 === null ? value : number1 + value;
            onChange({ number1: newNumber });
        }

        if (stage === "operator") {
            onChange({ number2: value });
        }

        if (stage === "secondNumber" && number2) {
            if (number2.length >= 3) {
                return;
            }
            let newNumber =
                number2 === "0" || number2 === null ? value : number2 + value;
            onChange({ number2: newNumber });
        }

        if (stage === "result") {
            onChange({
                number1: value,
                operator: null,
                number2: null,
                result: null
            });
        }
    };

    const calculateResult = (
        number1: string,
        number2: string,
        operator: string
    ) => {
        const num1 = Number(number1);
        const num2 = Number(number2);
        let result = null;

        if (operator === "+") {
            result = num1 + num2;
        }
        if (operator === "-") {
            result = num1 - num2;
        }
        if (operator === "*") {
            result = num1 * num2;
        }
        if (operator === "/") {
            result = num1 / num2;
        }
        result = result ? parseFloat(result.toFixed(10)) : "0";
        return result?.toString();
    };

    const isResetNeeded = (value: string) => {
        return (
            value.includes("Infinity") ||
            value === "NaN" ||
            value.length > 3 ||
            !Number.isInteger(Number(value))
        );
    };
    const handleOperatorInput = (value: string, stage: OperationStage) => {
        if (stage === "firstNumber" || stage === "operator") {
            onChange({ operator: value });
        }

        if (stage === "secondNumber" && number1 && number2 && operator) {
            const resultValue = calculateResult(number1, number2, operator);
            isResetNeeded(resultValue)
                ? onChange({ result: resultValue })
                : onChange({
                      number1: resultValue,
                      operator: value,
                      number2: null,
                      result: null
                  });
        }

        if (stage === "result") {
            result = result || "0";
            const prevResult = isResetNeeded(result) ? "0" : result;
            onChange({
                number1: prevResult,
                operator: prevResult === "0" ? null : value,
                number2: null,
                result: null
            });
        }
    };

    const getResult = (stage: OperationStage) => {
        if (stage === "operator") {
            onChange({
                operator: null
            });
        }
        if (stage === "secondNumber" && number1 && number2 && operator) {
            const newResult = calculateResult(number1, number2, operator);
            onChange({
                result: newResult ? newResult : null
            });
        }
    };

    const handleBackspace = (stage: OperationStage) => {
        const updateNumber = (number: null | string) => {
            if (number === null) {
                return null;
            }

            if (
                number.length === 1 ||
                (number.length === 2 && number[0] === "-")
            ) {
                return "0";
            }

            return number.slice(0, -1);
        };
        if (stage === "firstNumber") {
            onChange({
                number1: updateNumber(number1)
            });
        }
        if (stage === "operator") {
            onChange({
                number1: updateNumber(number1),
                operator: null
            });
        }

        if (stage === "secondNumber") {
            onChange({ number2: updateNumber(number2) });
        }
    };

    const resetValues = () => {
        onChange({
            number1: "0",
            operator: null,
            number2: null,
            result: null
        });
    };

    let displayedValue;
    switch (stage) {
        case "firstNumber":
            displayedValue = number1;
            break;
        case "operator":
            displayedValue = number1;
            break;
        case "secondNumber":
            displayedValue = number2;
            break;
        case "result":
            displayedValue = result;
            break;
        default:
            displayedValue = "";
    }

    return (
        <div className={styles.calculator}>
            <Display value={displayedValue ? displayedValue : ""} />
            <div className={styles.flex}>
                <Button value="C" onClick={handleButtonClick} type="reset" />
                <Description state={{ number1, number2, operator, result }} />
            </div>
            <div className={styles.grid}>
                <Button value="7" onClick={handleButtonClick} />
                <Button value="8" onClick={handleButtonClick} />
                <Button value="9" onClick={handleButtonClick} />
                <Button
                    value="/"
                    displayValue="&#247;"
                    type="operator"
                    onClick={handleButtonClick}
                />
                <Button value="4" onClick={handleButtonClick} />
                <Button value="5" onClick={handleButtonClick} />
                <Button value="6" onClick={handleButtonClick} />
                <Button
                    value="*"
                    displayValue="&#215;"
                    type="operator"
                    onClick={handleButtonClick}
                />
                <Button value="1" onClick={handleButtonClick} />
                <Button value="2" onClick={handleButtonClick} />
                <Button value="3" onClick={handleButtonClick} />
                <Button value="-" type="operator" onClick={handleButtonClick} />
                <Button
                    value="Backspace"
                    displayValue="&#8592;"
                    type="backspace"
                    onClick={handleButtonClick}
                />
                <Button value="0" onClick={handleButtonClick} />
                <Button value="=" type="result" onClick={handleButtonClick} />
                <Button value="+" type="operator" onClick={handleButtonClick} />
            </div>
        </div>
    );
};

export default Calculator;
