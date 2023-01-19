export const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const operators = ["+", "-", "*", "/"];

export const calculatorValues = [...digits, ...operators, "Backspace", "="];

export const setOperationStage = (state: OperationData): OperationStage => {
    const { number1, number2, operator, result } = state;

    if (number1 && operator && !number2 && !result) {
        return "operator";
    }

    if (number1 && number2 && operator && !result) {
        return "secondNumber";
    }

    if (number1 && operator && number2 && result) {
        return "result";
    }

    return "firstNumber";
};
