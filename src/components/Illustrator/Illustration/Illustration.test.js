import { screen, render } from "@testing-library/react";
import Illustration from "./Illustration";

test("renders illustration with 1 number", () => {
    render(<Illustration number1="5" imageType="primary" />);
    expect(screen.getAllByAltText("apple")).toHaveLength(5);
});

test("by default renders illustration with grid layout", () => {
    render(<Illustration number1="5" imageType="primary" />);
    expect(screen.getByTestId("grid")).toBeInTheDocument();
});

test("renders illustration with 2 different images", () => {
    render(
        <Illustration
            number1="7"
            number2="70"
            imageType="primary"
            imageType2="secondary"
        />
    );
    expect(screen.getAllByAltText("apple")).toHaveLength(7);
    expect(screen.getAllByAltText("green apple")).toHaveLength(70);
});

test("renders illustration with specified width", async () => {
    render(<Illustration number1="3" imageType="primary" width="100" />);
    expect(screen.getAllByAltText("apple")).toHaveLength(3);
    expect(screen.getByTestId("illustration")).toHaveStyle("width: 100px");
});

test("renders illustration with flex layout", () => {
    render(<Illustration number1="100" imageType="secondary" layout="flex" />);
    expect(screen.getByTestId("flex")).toBeInTheDocument();
});
