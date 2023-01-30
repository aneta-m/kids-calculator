import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

const buttonValue = "value";
const differentValue = "different name";

test("renders correctly with the value passed", () => {
    render(<Button value={buttonValue} onClick={() => null} />);
    const button = screen.getByRole("button", { name: buttonValue });
    expect(button).toBeInTheDocument();
});

test("renders correctly with prop displayValue different than value", () => {
    render(
        <Button
            value={buttonValue}
            displayValue={differentValue}
            onClick={() => null}
        />
    );
    const button = screen.getByRole("button", { name: differentValue });
    expect(button).toBeInTheDocument();
});

test("has class in accordance with type passed", () => {
    render(<Button value={buttonValue} onClick={() => null} type="operator" />);
    const button = screen.getByRole("button", { name: buttonValue });
    expect(button).toHaveClass("operator");
});

test("calls passed function on click", () => {
    const mockHandleClick = jest.fn();
    render(<Button value={buttonValue} onClick={mockHandleClick} />);
    userEvent.click(screen.getByRole("button", { name: buttonValue }));
    expect(mockHandleClick.mock.calls).toHaveLength(1);
});

test("calls passed function on key press", () => {
    const mockHandleClick = jest.fn();
    render(<Button value="s" onClick={mockHandleClick} />);
    userEvent.keyboard("s");
    expect(mockHandleClick.mock.calls).toHaveLength(1);
});

test("calls passed function on key press, when button value is uppercase 'C' and user presses lowercase 'c'", () => {
    const mockHandleClick = jest.fn();
    render(<Button value="C" onClick={mockHandleClick} />);
    userEvent.keyboard("c");
    expect(mockHandleClick.mock.calls).toHaveLength(1);
});

test("calls passed function on key press, when button value is '*' and user presses 'x'", () => {
    const mockHandleClick = jest.fn();
    render(<Button value="*" onClick={mockHandleClick} />);
    userEvent.keyboard("x");
    expect(mockHandleClick.mock.calls).toHaveLength(1);
});

test("calls passed function on key press, when button value is '=' and user presses 'enter'", () => {
    const mockHandleClick = jest.fn();
    render(<Button value="=" onClick={mockHandleClick} />);
    userEvent.keyboard("{Enter}");
    expect(mockHandleClick.mock.calls).toHaveLength(1);
});

test("calls passed function on key press, when button value is 'Backspace' and user presses 'Delete'", () => {
    const mockHandleClick = jest.fn();
    render(
        <Button value="Backspace" displayValue="<=" onClick={mockHandleClick} />
    );
    userEvent.keyboard("{Delete}");
    expect(mockHandleClick.mock.calls).toHaveLength(1);
});

test("gets focus on key down and looses focus when key released", async () => {
    render(<Button value="s" onClick={() => null} />);
    const button = screen.getByRole("button", { name: "s" });
    expect(button).not.toHaveClass("focused");
    userEvent.keyboard("{s>}");
    expect(button).toHaveClass("focused");
    userEvent.keyboard("{/s}");
    fireEvent.keyUp(screen.getByText("s"));
    expect(screen.getByText("s")).not.toHaveClass("focused");
});
