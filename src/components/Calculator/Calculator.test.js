import { screen, render } from "@testing-library/react";
import Calculator from "./Calculator";
import userEvent from "@testing-library/user-event";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

describe("Calculator renders correctly", () => {
    test("renders with 1 number", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="5"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getAllByText("5")).toHaveLength(3);
    });

    test("Calculator renders with 1 number and operator", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="5"
                number2={null}
                operator={"+"}
                result={null}
                stage="operator"
            />
        );
        expect(screen.getAllByText("0")).toHaveLength(1);
        expect(screen.getAllByText(/5/)).toHaveLength(3);
        expect(screen.getByText("5 +")).toBeInTheDocument();
    });

    test("Calculator renders with 2 numbers and opeartor", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="5"
                number2={"3"}
                operator={"*"}
                result={null}
                stage="secondNumber"
            />
        );
        expect(screen.getAllByText("0")).toHaveLength(1);
        expect(screen.getAllByText(/5/)).toHaveLength(2);
        expect(screen.getAllByText(/3/)).toHaveLength(3);
        expect(screen.getByText("5 * 3")).toBeInTheDocument();
    });

    test("Calculator renders with 2 numbers, opeartor and result", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="6"
                number2={"2"}
                operator={"/"}
                result={"3"}
                stage="result"
            />
        );
        expect(screen.getAllByText("0")).toHaveLength(1);
        expect(screen.getAllByText(/6/)).toHaveLength(2);
        expect(screen.getAllByText(/2/)).toHaveLength(2);
        expect(screen.getAllByText(/3/)).toHaveLength(3);
        expect(screen.getByText("6 / 2 = 3")).toBeInTheDocument();
    });
});

describe("Calculator correctly handles digit input", () => {
    test("updates value of number1 equal to 0 if digit button clicked", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "5" }));
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ number1: "5" });
    });

    test("updates value of number1 not equal to 0 on digit button click", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="3"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "5" }));
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ number1: "35" });
    });

    test("does not update value of number1 if digit button clicked when current number1 has 3 digits", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="111"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "5" }));
        expect(mockHandleChange.mock.calls).toHaveLength(0);
    });

    test("updates number2 if digit button clicked on operator stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={null}
                operator={"+"}
                result={null}
                stage="operator"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "7" }));
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ number2: "7" });
    });

    test("updates number2 if digit button clicked on the second number stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={"3"}
                operator={"+"}
                result={null}
                stage="secondNumber"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "7" }));
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ number2: "37" });
    });

    test("does not update number2 if digit button clicked when number2 has 3 digits", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={"321"}
                operator={"+"}
                result={null}
                stage="secondNumber"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "7" }));
        expect(mockHandleChange.mock.calls).toHaveLength(0);
    });

    test("resets values if digit button clicked on the result stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={"321"}
                operator={"+"}
                result={"321"}
                stage="result"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "7" }));
        const newState = mockHandleChange.mock.calls[0][0];
        expect(newState).toEqual({
            number1: "7",
            operator: null,
            number2: null,
            result: null
        });
    });
});

describe("Calculator correctly handles operator input", () => {
    test("updates operator if operator key pressed on the first number stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        keyboard("x");
        expect(mockHandleChange.mock.calls).toHaveLength(1);
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ operator: "*" });
    });
    test("changes operator if operator button clicked on the operator stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="0"
                number2={null}
                operator={"+"}
                result={null}
                stage="operator"
            />
        );
        keyboard("/");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ operator: "/" });
    });

    test("resets with a result value as a new number1 (if this value is an integer) when a new operator entered on the second number stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2="4"
                operator={"+"}
                result={null}
                stage="secondNumber"
            />
        );
        keyboard("/");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({
            number1: "11",
            operator: "/",
            number2: null,
            result: null
        });
    });
    test("shows the result if a result value is not an integer, when an operator entered on the second number stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2="4"
                operator="/"
                result={null}
                stage="secondNumber"
            />
        );
        keyboard("+");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({
            result: "1.75"
        });
    });
    test("resets with a result value as a new number1 (if this value is an integer) when a new operator entered on the result stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2="4"
                operator={"+"}
                result="11"
                stage="result"
            />
        );
        keyboard("/");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({
            number1: "11",
            operator: "/",
            number2: null,
            result: null
        });
    });
    test("shows 0 if result value is not an integer, when an operator entered on the result stage", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2="4"
                operator="/"
                result="1.75"
                stage="result"
            />
        );
        keyboard("+");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({
            number1: "0",
            operator: null,
            number2: null,
            result: null
        });
    });
});

describe("Calculator correctly handles '=' request", () => {
    test("on the first number stage does not change anything", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        keyboard("=");
        expect(mockHandleChange.mock.calls).toHaveLength(0);
    });
    test("on the operator stage shows the first number again", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2={null}
                operator="+"
                result={null}
                stage="operator"
            />
        );
        keyboard("=");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ operator: null });
    });
    test("on the second number stage shows the result", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="7"
                number2="3"
                operator="+"
                result={null}
                stage="secondNumber"
            />
        );
        keyboard("{Enter}");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ result: "10" });
    });
});

describe("Calculator correctly handles delete input", () => {
    test("removes the last digit if the number has more than 1 digit", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="79"
                number2={null}
                operator={null}
                result={null}
                stage="firstNumber"
            />
        );
        keyboard("{Backspace}");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ number1: "7" });
    });
    test("shows 0 if the number has only 1 digit", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="2"
                number2="7"
                operator="+"
                result={null}
                stage="secondNumber"
            />
        );
        userEvent.click(screen.getByRole("button", { name: "←" }));
        expect(mockHandleChange.mock.calls[0][0]).toEqual({ number2: "0" });
    });
    test("if on operator stage deletes current operator and updates number1", () => {
        const mockHandleChange = jest.fn();
        render(
            <Calculator
                onChange={mockHandleChange}
                number1="358"
                number2={null}
                operator="+"
                result={null}
                stage="operator"
            />
        );
        keyboard("{Backspace}");
        expect(mockHandleChange.mock.calls[0][0]).toEqual({
            number1: "35",
            operator: null
        });
    });
    // test("on the operator stage shows the first number again", () => {
    //     const mockHandleChange = jest.fn();
    //     render(
    //         <Calculator
    //             onChange={mockHandleChange}
    //             number1="7"
    //             number2={null}
    //             operator="+"
    //             result={null}
    //             stage="operator"
    //         />
    //     );
    //     keyboard("=");
    //     expect(mockHandleChange.mock.calls[0][0]).toEqual({ operator: null });
    // });
    // test("on the second number stage shows the result", () => {
    //     const mockHandleChange = jest.fn();
    //     render(
    //         <Calculator
    //             onChange={mockHandleChange}
    //             number1="7"
    //             number2="3"
    //             operator="+"
    //             result={null}
    //             stage="secondNumber"
    //         />
    //     );
    //     keyboard("{Enter}");
    //     expect(mockHandleChange.mock.calls[0][0]).toEqual({ result: "10" });
    // });
});

// test("renders Calculator with 1 number and operator", () => {
//     const mockHandleChange = jest.fn();
//     render(
//         <Calculator
//             onChange={mockHandleChange}
//             number1="5"
//             number2={null}
//             operator={"+"}
//             result={null}
//             stage="operator"
//         />
//     );
//     expect(screen.getAllByText("0")).toHaveLength(1);
//     expect(screen.getAllByText(/5/)).toHaveLength(3);
//     expect(screen.getByText("5 +")).toBeInTheDocument();
// });

// test("renders Calculator with 2 numbers and opeartor", () => {
//     const mockHandleChange = jest.fn();
//     render(
//         <Calculator
//             onChange={mockHandleChange}
//             number1="5"
//             number2={"3"}
//             operator={"*"}
//             result={null}
//             stage="secondNumber"
//         />
//     );
//     expect(screen.getAllByText("0")).toHaveLength(1);
//     expect(screen.getAllByText(/5/)).toHaveLength(2);
//     expect(screen.getAllByText(/3/)).toHaveLength(3);
//     expect(screen.getByText("5 * 3")).toBeInTheDocument();
// });

// test("renders Calculator with 2 numbers, opeartor and result", () => {
//     const mockHandleChange = jest.fn();
//     render(
//         <Calculator
//             onChange={mockHandleChange}
//             number1="6"
//             number2={"2"}
//             operator={"/"}
//             result={"3"}
//             stage="result"
//         />
//     );
//     expect(screen.getAllByText("0")).toHaveLength(1);
//     expect(screen.getAllByText(/6/)).toHaveLength(2);
//     expect(screen.getAllByText(/2/)).toHaveLength(2);
//     expect(screen.getAllByText(/3/)).toHaveLength(3);
//     expect(screen.getByText("6 / 2 = 3")).toBeInTheDocument();
// });
