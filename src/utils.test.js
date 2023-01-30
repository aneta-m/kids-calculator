import { setOperationStage } from "./utils";

describe("function setOperatingStage returns correct operation stage", () => {
    test("returns properly firstNumber stage", () => {
        expect(
            setOperationStage({
                number1: "2",
                operator: null,
                secondNumber: null,
                result: null
            })
        ).toBe("firstNumber");
    });
    test("returns properly operator stage", () => {
        expect(
            setOperationStage({
                number1: "2",
                operator: "+",
                number2: null,
                result: null
            })
        ).toBe("operator");
    });
    test("returns properly secondNumber stage", () => {
        expect(
            setOperationStage({
                number1: "2",
                operator: "+",
                number2: "3",
                result: null
            })
        ).toBe("secondNumber");
    });
    test("returns properly result stage", () => {
        expect(
            setOperationStage({
                number1: "2",
                operator: "+",
                number2: "3",
                result: "5"
            })
        ).toBe("result");
    });
});
