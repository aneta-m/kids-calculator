import { render, screen } from "@testing-library/react";
import IllustrationImage from "./IllustrationImage";

test("renders correctly primary image", () => {
    render(<IllustrationImage type="primary" width="20" />);
    expect(screen.getByAltText("red apple")).toBeInTheDocument();
    expect(screen.getByTestId("image-container")).toHaveStyle("width: 20px");
});

test("renders correctly secondary image", () => {
    render(<IllustrationImage type="secondary" width="30" />);
    expect(screen.getByAltText("green apple")).toBeInTheDocument();
});

test("renders correctly subtract image", () => {
    render(<IllustrationImage type="subtract" width="30" />);
    expect(screen.getByAltText("apple core")).toBeInTheDocument();
});

test("renders transparent image correctly", () => {
    render(<IllustrationImage type="transparent-subtract" width="50" />);
    expect(screen.getByAltText("disappearing apple core")).toHaveClass(
        "transparent"
    );
    expect(screen.getByTestId("image-container")).toHaveStyle("width: 50px");
});
