import { render, screen } from "@testing-library/react";
import Display from "./Display";

test("shows text when string passed", () => {
    render(<Display value="53" />);
    expect(screen.getByText("53")).toBeInTheDocument();
});

test("when string with infinite value passed, shows warning instead of 'infinity'", () => {
    render(<Display value="Infinity" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText(/Infinity/)).not.toBeInTheDocument();
});
