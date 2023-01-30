import { render, screen } from "@testing-library/react";
import CardComment from "./CardComment";

test("renders text and arrow with variant top", () => {
    const text = "some text";
    render(<CardComment type="top" text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByAltText("arrow")).toBeInTheDocument();
});

test("renders text and arrow with variant bottom", () => {
    const text = "some text";
    render(<CardComment type="bottom" text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByAltText("arrow")).toBeInTheDocument();
});
