import React from "react";
import { render, screen, act } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

describe("App", () => {
    test("renders App with '0'", () => {
        render(<App />);
        expect(screen.getAllByText("0")).toHaveLength(4);
    });
    test("correctly updates state in calculator and illustrator when user enters input", () => {
        render(<App />);
        user.click(screen.getByRole("button", { name: "5" }));
        expect(screen.getAllByText(/5/)).toHaveLength(4);
        expect(screen.getAllByAltText("red apple")).toHaveLength(5);
        user.click(screen.getByRole("button", { name: "+" }));
        user.click(screen.getByRole("button", { name: "2" }));
        user.click(screen.getByRole("button", { name: "=" }));
        expect(screen.getByText("5 + 2 = 7")).toBeInTheDocument();
        expect(screen.getAllByText(/7/)).toHaveLength(4);
        expect(screen.getAllByAltText("red apple")).toHaveLength(5);
        expect(screen.getAllByAltText("green apple")).toHaveLength(2);
        user.click(screen.getByRole("button", { name: "-" }));
        user.click(screen.getByRole("button", { name: "3" }));
        expect(screen.getAllByAltText("red apple")).toHaveLength(4);
        expect(screen.getAllByAltText("apple core")).toHaveLength(3);
        user.click(screen.getByRole("button", { name: "=" }));
        expect(screen.getByText(/7 - 3 = 4/)).toBeInTheDocument();
        expect(screen.getAllByText(/4/)).toHaveLength(4);
        expect(screen.getAllByAltText("red apple")).toHaveLength(4);
        user.click(screen.getByRole("button", { name: "C" }));
        user.click(screen.getByRole("button", { name: "2" }));
        user.click(screen.getByRole("button", { name: "×" }));
        user.click(screen.getByRole("button", { name: "8" }));
        expect(screen.getByText("2 * 8")).toBeInTheDocument();
        expect(screen.getAllByTestId("card")).toHaveLength(8);
        user.click(screen.getByRole("button", { name: "=" }));
        expect(screen.getAllByAltText("red apple")).toHaveLength(16);
        expect(
            screen.getByText("8 groups of 2 apples each. 16 apples in total")
        ).toBeInTheDocument();
        keyboard("/");
        user.click(screen.getByRole("button", { name: "2" }));
        expect(screen.getAllByTestId("card")).toHaveLength(2);
        expect(screen.getAllByAltText("red apple")).toHaveLength(16);
        user.click(screen.getByRole("button", { name: "=" }));
        expect(
            screen.getByText("2 groups of 8 apples each")
        ).toBeInTheDocument();
        keyboard("200");
        keyboard("{Backspace}");
        keyboard("-");
        keyboard("22");
        keyboard("=");
        expect(screen.getAllByTestId("card")).toHaveLength(1);
        expect(screen.queryAllByAltText("red apple")).toHaveLength(0);
        expect(screen.getAllByAltText("apple core")).toHaveLength(2);
        expect(screen.getByText(/20 - 22 = -2/)).toBeInTheDocument();
    });
});
