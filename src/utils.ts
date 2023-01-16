
export const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const operators = ["+", "-", "*", "/"];

export const calculatorValues = [...digits, ...operators, "Backspace", '='];

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



// const updateHandlers = {
//     firstNumber: {
//         number: addNumber(number1),
//         operator: setNewValue(operator),
//         result: setResult(),
//         backspace: removeNumber(number1)
//     },
//     operator: {
//         number: addNumber(number2),
//         operator: setNewValue(operator),
//         result: setResult(),
//         backspace: removeNumberAndOperator(number1)
//     },
//     secondNumber: {
//         number: addNumber(number2),
//         operator: setResult(), resetAndSetNewFirstNumber(number1), 
//         result: setResult(),
//         backspace: removeNumber(number2)
//     },
//     result: {
//         number: resetAndSetNewFirstNumber(number1);
//         operator: resetAndSetNewFirstNumberAndOperator();
//         result: setError();
//         backspace: resetAndSetNewFirstNumberUpdated(number1);
//     }
// }