import { screen, render, within } from "@testing-library/react";
import Grid from "./Grid";

test("renders Grid correctly", () => {
    render(
        <Grid cols={4} gap={20}>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
            <div>child</div>
        </Grid>
    );
    const grid = screen.getByTestId("grid");
    expect(grid).toBeInTheDocument();
    expect(within(grid).getAllByText("child")).toHaveLength(10);
    expect(grid).toHaveStyle({
        gridTemplateColumns: "repeat(4, auto)",
        gap: "20px"
    });
});
