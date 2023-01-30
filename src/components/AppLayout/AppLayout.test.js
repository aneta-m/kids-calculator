import { screen, render } from "@testing-library/react";
import AppLayout from "./AppLayout";

test("renders AppLayout", () => {
    render(
        <AppLayout>
            <div>first element</div>
            <div>second element</div>
        </AppLayout>
    );
    expect(screen.getAllByText(/element/)).toHaveLength(2);
    expect(screen.getByText(/rotate your device/)).toBeInTheDocument();
});
