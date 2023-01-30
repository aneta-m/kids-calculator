import { screen, render, within } from "@testing-library/react";
import Flex from "./Flex";

test("renders Flex correctly", () => {
    render(
        <Flex height="100" width="200">
            <div>first child</div>
            <div>second child</div>
        </Flex>
    );
    const flexContainer = screen.getByTestId("flex");
    expect(flexContainer).toBeInTheDocument();
    expect(flexContainer).toHaveStyle({ height: "100px", width: "200px" });
    expect(within(flexContainer).getByText("first child")).toBeInTheDocument();
    expect(within(flexContainer).getByText("second child")).toBeInTheDocument();
});
