import { screen, render, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Illustrator from "./Illustrator";

describe("Illustrator renders correctly if on the first number stage", () => {
    test("renders 1 card and red apples if the number is positive", () => {
        render(
            <Illustrator
                data={{
                    number1: "222",
                    operator: null,
                    number2: null,
                    result: null
                }}
                stage="firstNumber"
            />
        );
        expect(screen.getByTestId("card")).toBeInTheDocument();
        expect(screen.getAllByAltText("red apple")).toHaveLength(222);
        expect(screen.getByText("222")).toBeInTheDocument();
    });
});
describe("Illustrator renders correctly Addition Illustrator if the operator is '+'", () => {
    test("on the operator stage, if the first number is positive, renders 1 card with red apples", () => {
        render(
            <Illustrator
                data={{
                    number1: "3",
                    operator: "+",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("red apple")).toHaveLength(3);
        expect(screen.getByText("+")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });
    test("on the operator stage, if the first number is negative, renders 1 card with apple cores", () => {
        render(
            <Illustrator
                data={{
                    number1: "-33",
                    operator: "+",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("apple core")).toHaveLength(33);
        expect(screen.getByText("-33")).toBeInTheDocument();
        expect(screen.getByText("+")).toBeInTheDocument();
    });
    test("on the second number stage, if both numbers are positive, renders 2 cards with red and green apples", () => {
        render(
            <Illustrator
                data={{
                    number1: "5",
                    operator: "+",
                    number2: "78",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(5);
        expect(within(cards[1]).getAllByAltText("green apple")).toHaveLength(
            78
        );
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("+")).toBeInTheDocument();
        expect(screen.getByText("78")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is negative, renders 2 cards: with apple cores and green apples", () => {
        render(
            <Illustrator
                data={{
                    number1: "-15",
                    operator: "+",
                    number2: "7",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(15);
        expect(within(cards[1]).getAllByAltText("green apple")).toHaveLength(7);
        expect(screen.getByText("-15")).toBeInTheDocument();
    });
    test("if it's the result stage with 2 positive ingredients, first shows 2 cards with red and green apples seperately and after 1 second shows 1 card with the sum", () => {
        jest.useFakeTimers();
        render(
            <Illustrator
                data={{
                    number1: "2",
                    operator: "+",
                    number2: "3",
                    result: "5"
                }}
                stage="result"
            />
        );

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(2);
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(2);
        expect(within(cards[1]).getAllByAltText("green apple")).toHaveLength(3);
        act(() => jest.advanceTimersByTime(1000));
        const cardsAfter1Second = screen.getAllByTestId("card");
        expect(cardsAfter1Second).toHaveLength(1);
        expect(
            within(cardsAfter1Second[0]).getAllByAltText("red apple")
        ).toHaveLength(2);
        expect(
            within(cardsAfter1Second[0]).getAllByAltText("green apple")
        ).toHaveLength(3);
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("+")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });
    test("on the result stage if the first number is negative and result is positive first shows 2 cards with 2 ingredients seperately and after 1 second shows 1 card with leftover green apples", () => {
        jest.useFakeTimers();
        render(
            <Illustrator
                data={{
                    number1: "-2",
                    operator: "+",
                    number2: "3",
                    result: "1"
                }}
                stage="result"
            />
        );

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(2);
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(2);
        expect(within(cards[1]).getAllByAltText("green apple")).toHaveLength(3);
        act(() => jest.advanceTimersByTime(1000));
        const cardsAfter1Second = screen.getAllByTestId("card");
        expect(cardsAfter1Second).toHaveLength(1);
        expect(
            within(cardsAfter1Second[0]).queryAllByAltText("apple core")
        ).toHaveLength(0);
        expect(
            within(cardsAfter1Second[0]).getAllByAltText("green apple")
        ).toHaveLength(1);
        expect(screen.getByText("-2")).toBeInTheDocument();
        expect(screen.getByText("+")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        jest.useRealTimers();
    });
    test("on the result stage if both number1 and result are negative first shows 2 cards with 2 ingredients seperately and after 1 second shows 1 card with leftover apple cores", () => {
        jest.useFakeTimers();
        render(
            <Illustrator
                data={{
                    number1: "-8",
                    operator: "+",
                    number2: "7",
                    result: "-1"
                }}
                stage="result"
            />
        );

        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(2);
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(8);
        expect(within(cards[1]).getAllByAltText("green apple")).toHaveLength(7);
        act(() => jest.advanceTimersByTime(1000));
        const cardsAfter1Second = screen.getAllByTestId("card");
        expect(cardsAfter1Second).toHaveLength(1);
        expect(
            within(cardsAfter1Second[0]).getAllByAltText("apple core")
        ).toHaveLength(1);
        expect(
            within(cardsAfter1Second[0]).queryAllByAltText("green apple")
        ).toHaveLength(0);
        expect(screen.getByText("-8")).toBeInTheDocument();
        expect(screen.getByText("+")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("-1")).toBeInTheDocument();
        jest.useRealTimers();
    });
});

describe("Illustrator renders correctly Subtraction Illustrator if the operator is '-'", () => {
    test("on the operator stage, if the first number is positive, renders 1 card with red apples", () => {
        render(
            <Illustrator
                data={{
                    number1: "3",
                    operator: "-",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("red apple")).toHaveLength(3);
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
    });
    test("on the operator stage, if the first number is negative, renders 1 card with apple cores", () => {
        render(
            <Illustrator
                data={{
                    number1: "-13",
                    operator: "-",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("apple core")).toHaveLength(13);
        expect(screen.getByText("-13")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is greater than number2, renders 1 card with red apples and apple cores", () => {
        render(
            <Illustrator
                data={{
                    number1: "13",
                    operator: "-",
                    number2: "5",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("red apple")).toHaveLength(8);
        expect(within(card).getAllByAltText("apple core")).toHaveLength(5);
        expect(screen.getByText("13")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is positive, but smaller than number2, renders 1 card with apple cores equal to number2", () => {
        render(
            <Illustrator
                data={{
                    number1: "4",
                    operator: "-",
                    number2: "7",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).queryAllByAltText("red apple")).toHaveLength(0);
        expect(within(card).getAllByAltText("apple core")).toHaveLength(7);
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is negative, renders 1 card with apple cores equal to result", () => {
        render(
            <Illustrator
                data={{
                    number1: "-4",
                    operator: "-",
                    number2: "6",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        expect(
            within(screen.getByTestId("card")).getAllByAltText("apple core")
        ).toHaveLength(10);
        expect(screen.getByText("-4")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("6")).toBeInTheDocument();
    });
    test("on the result stage, if the first number and result are positive, renders 1 card with red apples and disappearing apple cores", () => {
        render(
            <Illustrator
                data={{
                    number1: "5",
                    operator: "-",
                    number2: "3",
                    result: "2"
                }}
                stage="result"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("red apple")).toHaveLength(2);
        expect(
            within(card).getAllByAltText("disappearing apple core")
        ).toHaveLength(3);
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });
    test("on the result stage, if the first number is positive and result is negative, renders 1 card with apples core equal to result and disappearing apple cores equal to number1", () => {
        render(
            <Illustrator
                data={{
                    number1: "5",
                    operator: "-",
                    number2: "7",
                    result: "-2"
                }}
                stage="result"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("apple core")).toHaveLength(2);
        expect(
            within(card).getAllByAltText("disappearing apple core")
        ).toHaveLength(5);
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("-2")).toBeInTheDocument();
    });
    test("on the result stage, if the first number is negative, renders 1 card with apple cores", () => {
        render(
            <Illustrator
                data={{
                    number1: "-5",
                    operator: "-",
                    number2: "4",
                    result: "-9"
                }}
                stage="result"
            />
        );

        expect(
            within(screen.getByTestId("card")).getAllByAltText("apple core")
        ).toHaveLength(9);
        expect(screen.getByText("-5")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("-9")).toBeInTheDocument();
    });
});

describe("Illustrator renders correctly Multiplication Illustrator if the operator is '*'", () => {
    test("on the operator stage, if the first number is positive, renders 1 card with red apples", () => {
        render(
            <Illustrator
                data={{
                    number1: "3",
                    operator: "*",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("red apple")).toHaveLength(3);
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
    });
    test("on the operator stage, if the first number is negative, renders 1 card with apple cores", () => {
        render(
            <Illustrator
                data={{
                    number1: "-13",
                    operator: "*",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("apple core")).toHaveLength(13);
        expect(screen.getByText("-13")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is positive, renders cards equal to the second number, each of red apples equal to the first number", () => {
        render(
            <Illustrator
                data={{
                    number1: "3",
                    operator: "*",
                    number2: "5",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(5);
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(3);
        expect(within(cards[3]).getAllByAltText("red apple")).toHaveLength(3);
        expect(screen.getAllByAltText("red apple")).toHaveLength(15);
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is negative, renders cards equal to the second number, each of apple cores equal to the first number", () => {
        render(
            <Illustrator
                data={{
                    number1: "-7",
                    operator: "*",
                    number2: "15",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(15);
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(7);
        expect(within(cards[13]).getAllByAltText("apple core")).toHaveLength(7);
        expect(screen.getAllByAltText("apple core")).toHaveLength(105);
        expect(screen.getByText("-7")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
        expect(screen.getByText("15")).toBeInTheDocument();
    });
    test("on the result stage, if the first number is positive, renders cards equal to the second number, each of red apples equal to the first number and a comment", () => {
        render(
            <Illustrator
                data={{
                    number1: "9",
                    operator: "*",
                    number2: "60",
                    result: "540"
                }}
                stage="result"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(60);
        expect(within(cards[4]).getAllByAltText("red apple")).toHaveLength(9);
        expect(within(cards[59]).getAllByAltText("red apple")).toHaveLength(9);
        expect(screen.getAllByAltText("red apple")).toHaveLength(540);
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
        expect(screen.getByText("60")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("540")).toBeInTheDocument();
        expect(
            screen.getByText("60 groups of 9 apples each. 540 apples in total")
        ).toBeInTheDocument();
    });
    test("on the result stage, if the first number is negative, renders cards equal to the second number, each of apple cores equal to the first number and a comment", () => {
        render(
            <Illustrator
                data={{
                    number1: "-90",
                    operator: "*",
                    number2: "11",
                    result: "-990"
                }}
                stage="result"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(11);
        expect(within(cards[1]).getAllByAltText("apple core")).toHaveLength(90);
        expect(within(cards[10]).getAllByAltText("apple core")).toHaveLength(
            90
        );
        expect(screen.getAllByAltText("apple core")).toHaveLength(990);
        expect(screen.getByText("-90")).toBeInTheDocument();
        expect(screen.getByText("*")).toBeInTheDocument();
        expect(screen.getByText("11")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("-990")).toBeInTheDocument();
        expect(
            screen.getByText(
                "11 groups of 90 applecores each. 990 applecores in total"
            )
        ).toBeInTheDocument();
    });
});

describe("Illustrator renders correctly Division Illustrator if the operator is '/'", () => {
    test("on the operator stage, if the first number is positive, renders 1 card with red apples", () => {
        render(
            <Illustrator
                data={{
                    number1: "9",
                    operator: "/",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("red apple")).toHaveLength(9);
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
    });
    test("on the operator stage, if the first number is negative, renders 1 card with apple core", () => {
        render(
            <Illustrator
                data={{
                    number1: "-19",
                    operator: "/",
                    number2: null,
                    result: null
                }}
                stage="operator"
            />
        );
        const card = screen.getByTestId("card");
        expect(within(card).getAllByAltText("apple core")).toHaveLength(19);
        expect(screen.getByText("-19")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is positive and the result is an integer, renders cards equal to the second number, each of red apples equal to the result", () => {
        render(
            <Illustrator
                data={{
                    number1: "12",
                    operator: "/",
                    number2: "3",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(3);
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(4);
        expect(within(cards[2]).getAllByAltText("red apple")).toHaveLength(4);
        expect(screen.getAllByAltText("red apple")).toHaveLength(12);
        expect(screen.getByText("12")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is negative and the result is an integer, renders cards equal to the second number, each of apple cores equal to the result", () => {
        render(
            <Illustrator
                data={{
                    number1: "-100",
                    operator: "/",
                    number2: "20",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(20);
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(5);
        expect(within(cards[2]).getAllByAltText("apple core")).toHaveLength(5);
        expect(screen.getAllByAltText("apple core")).toHaveLength(100);
        expect(screen.getByText("-100")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("20")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is positive and the result is not an integer, renders cards equal to the second number + 1, each except the last one with apples equal to the result rounded down to an integer, the last one with apples equal to the remainder", () => {
        render(
            <Illustrator
                data={{
                    number1: "20",
                    operator: "/",
                    number2: "3",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(4);
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(6);
        expect(within(cards[1]).getAllByAltText("red apple")).toHaveLength(6);
        expect(within(cards[2]).getAllByAltText("red apple")).toHaveLength(6);
        expect(within(cards[3]).getAllByAltText("red apple")).toHaveLength(2);
        expect(screen.getAllByAltText("red apple")).toHaveLength(20);
        expect(screen.getByText("20")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });
    test("on the second number stage, if the first number is negative and the result is not an integer, renders cards equal to the second number + 1, each except the last one with apple cores equal to the result absolute value rounded down to an integer, the last one with apple cores equal to the remainder absolute value", () => {
        render(
            <Illustrator
                data={{
                    number1: "-7",
                    operator: "/",
                    number2: "2",
                    result: null
                }}
                stage="secondNumber"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(3);
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(3);
        expect(within(cards[1]).getAllByAltText("apple core")).toHaveLength(3);
        expect(within(cards[2]).getAllByAltText("apple core")).toHaveLength(1);
        expect(screen.getAllByAltText("apple core")).toHaveLength(7);
        expect(screen.getByText("-7")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });
    test("on the result stage, if the result is an integer, renders cards equal to the second number, each of apples equal to the result and 1 comment", () => {
        render(
            <Illustrator
                data={{
                    number1: "15",
                    operator: "/",
                    number2: "1",
                    result: "15"
                }}
                stage="result"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(1);
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(15);
        expect(screen.getAllByAltText("red apple")).toHaveLength(15);
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getAllByText("15")).toHaveLength(2);
        expect(screen.getByText("1 group of 15 apples")).toBeInTheDocument();
    });
    test("on the result stage, if the result is not an integer, renders cards equal to the second number + 1, each except the last one with apples equal to the result, the last one with apples equal to the remainder and 2 comments", () => {
        render(
            <Illustrator
                data={{
                    number1: "15",
                    operator: "/",
                    number2: "4",
                    result: "3.75"
                }}
                stage="result"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(5);
        expect(within(cards[0]).getAllByAltText("red apple")).toHaveLength(3);
        expect(within(cards[3]).getAllByAltText("red apple")).toHaveLength(3);
        expect(screen.getAllByAltText("red apple")).toHaveLength(15);
        expect(screen.getByText("15")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("3, remainder: 3")).toBeInTheDocument();
        expect(
            screen.getByText("4 groups of 3 apples each")
        ).toBeInTheDocument();
        expect(screen.getByText("3 apples left over")).toBeInTheDocument();
    });
    test("on the result stage, if the first number is negative and the result is not an integer, renders cards equal to the second number absolute value + 1, each except the last one with apple cores equal to the result absolute value, the last one with apple cores equal to the remainder absolute value and 2 comments", () => {
        render(
            <Illustrator
                data={{
                    number1: "-5",
                    operator: "/",
                    number2: "4",
                    result: "-1.25"
                }}
                stage="result"
            />
        );
        const cards = screen.getAllByTestId("card");
        expect(cards).toHaveLength(5);
        expect(within(cards[0]).getAllByAltText("apple core")).toHaveLength(1);
        expect(within(cards[3]).getAllByAltText("apple core")).toHaveLength(1);
        expect(screen.getAllByAltText("apple core")).toHaveLength(5);
        expect(screen.getByText("-5")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("-1, remainder: -1")).toBeInTheDocument();
        expect(
            screen.getByText("4 groups of 1 apple core each")
        ).toBeInTheDocument();
        expect(screen.getByText("1 apple core left over")).toBeInTheDocument();
    });
});
