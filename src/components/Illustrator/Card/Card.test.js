import { render, screen } from "@testing-library/react";
import Card from "./Card";

test("renders correctly with passed children", () => {
    render(
        <Card>
            <div>test div</div>
        </Card>
    );
    expect(screen.getAllByText("test div")).toHaveLength(1);
    expect(screen.getByTestId("card")).toBeInTheDocument();
});

test("renders with passed padding", () => {
    render(
        <Card padding="30px">
            <div>test div</div>
        </Card>
    );
    expect(screen.getByTestId("card")).toHaveStyle("padding: 30px");
});

test("renders correctly the light variant", () => {
    render(
        <Card variant="light">
            <div>test div</div>
        </Card>
    );
    expect(screen.getByTestId("card")).toHaveClass("light");
});

test("renders with comment", () => {
    render(
        <Card comment={{ type: "top", text: "comment text" }}>
            <div>test div</div>
        </Card>
    );
    const comment = screen.getByText("comment text");
    expect(comment).toBeInTheDocument();
});
