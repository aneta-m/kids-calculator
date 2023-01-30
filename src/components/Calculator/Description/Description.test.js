import { render, screen } from "@testing-library/react";
import Description from "./Description";

describe("Description size s", () => {
    test("shows correctly description when rendered with data", () => {
        const data = {
            number1: "2",
            operator: "+",
            number2: "1",
            result: "3"
        };
        render(<Description state={data} />);
        expect(screen.getByText("2 + 1 = 3")).toBeInTheDocument();
    });

    test("shows result with decimal when result with decimal", () => {
        const data = {
            number1: "9",
            operator: "/",
            number2: "2",
            result: "4.5"
        };
        render(<Description state={data} />);
        expect(screen.getByText("9 / 2 = 4.5")).toBeInTheDocument();
    });
});

describe("Description size l", () => {
    test("shows correctly description", () => {
        const data = {
            number1: "30",
            operator: "-",
            number2: "12",
            result: "18"
        };
        render(<Description state={data} size="l" />);
        expect(screen.getByText("30")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
        expect(screen.getByText("12")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("18")).toBeInTheDocument();
    });
    test("shows result with remainder when result with decimal", () => {
        const data = {
            number1: "9",
            operator: "/",
            number2: "2",
            result: "4.5"
        };
        render(<Description state={data} size="l" />);
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("4, remainder: 1")).toBeInTheDocument();
    });

    test("shows result without remainder when result is an integer", () => {
        const data = {
            number1: "8",
            operator: "/",
            number2: "2",
            result: "4"
        };
        render(<Description state={data} size="l" />);
        expect(screen.getByText("8")).toBeInTheDocument();
        expect(screen.getByText("/")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("=")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.queryByText("remainder")).not.toBeInTheDocument();
    });
});
