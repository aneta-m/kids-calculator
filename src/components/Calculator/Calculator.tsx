import React, { useEffect } from "react";
import styles from "./Calculator.module.scss";
import Button from "./Button/Button";
import Display from "./Display/Display";
import { digits, operators } from "../../utils";
import Description from "./Description/Description";

const Calculator = ({
    setState,
    state,
    stage
}: {
    setState: React.Dispatch<React.SetStateAction<OperationData>>;
    state: OperationData;
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
        if (stage === "firstNumber") {
            setState((prevState) => {
                if (prevState.number1.length >= 3) {
                    return { ...prevState };
                }
                let newNumber =
                    prevState.number1 === "0" || prevState.number1 === null
                        ? value
                        : prevState.number1 + value;
                return { ...prevState, number1: newNumber };
            });
        }

        if (stage === "operator") {
            setState((prevState) => {
                return { ...prevState, number2: value };
            });
        }

        if (stage === "secondNumber") {
            setState((prevState) => {
                if (prevState.number2 && prevState.number2.length >= 3) {
                    return { ...prevState };
                }
                let newNumber =
                    prevState.number2 === "0" || prevState.number2 === null
                        ? value
                        : prevState.number2 + value;
                return { ...prevState, number2: newNumber };
            });
        }

        if (stage === "result") {
            setState({
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
            setState((prevState) => {
                return { ...prevState, operator: value };
            });
        }

        if (stage === "secondNumber") {
            setState((prevState) => {
                const result = calculateResult(
                    prevState.number1!,
                    prevState.number2!,
                    prevState.operator!
                )!;

                return isResetNeeded(result)
                    ? {
                          ...prevState,
                          result: result
                      }
                    : {
                          number1: result ? result : "0",
                          operator: value,
                          number2: null,
                          result: null
                      };
            });
        }

        if (stage === "result") {
            setState((prevState) => {
                const prevResult = isResetNeeded(prevState.result!)
                    ? "0"
                    : prevState.result;

                return {
                    number1: prevResult!,
                    operator: prevResult === "0" ? null : value,
                    number2: null,
                    result: null
                };
            });
        }
    };

    const getResult = (stage: OperationStage) => {
        if (stage === "firstNumber" || stage === "operator") {
            console.log("first number or operator");
            setState((prevState) => {
                return {
                    number1: prevState.number1,
                    operator: null,
                    number2: null,
                    result: null
                };
            });
        }
        if (stage === "secondNumber") {
            setState((prevState) => {
                const newResult = calculateResult(
                    prevState.number1!,
                    prevState.number2!,
                    prevState.operator!
                );
                return {
                    ...prevState,
                    result: newResult ? newResult : null
                };
            });
        }
    };

    const handleBackspace = (stage: OperationStage) => {
        const updateNumber = (number: null | string) => {
            if (number === null) {
                return null;
            }

            if (number.length === 1) {
                return "0";
            }

            return number.slice(0, -1);
        };
        if (stage === "firstNumber" || stage === "operator") {
            setState((prevState) => {
                return {
                    number1: updateNumber(prevState.number1)!,
                    operator: null,
                    number2: null,
                    result: null
                };
            });
            return;
        }

        if (stage === "secondNumber") {
            console.log("secondnumber");
            setState((prevState) => {
                return {
                    ...prevState,
                    number2: updateNumber(prevState.number2)
                };
            });
            return;
        }
    };

    const resetValues = () => {
        setState({
            number1: "0",
            operator: null,
            number2: null,
            result: null
        });
    };

    let displayedValue;
    switch (stage) {
        case "firstNumber":
            displayedValue = state.number1!;
            break;
        case "operator":
            displayedValue = state.number1!;
            break;
        case "secondNumber":
            displayedValue = state.number2!;
            break;
        case "result":
            displayedValue = state.result!;
            break;
        default:
            displayedValue = "";
    }

    return (
        <div className={styles.calculator}>
            <Display value={displayedValue} />
            <div className={styles.flex}>
                <Button value="C" onClick={handleButtonClick} type="reset" />
                <Description state={state} />
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
