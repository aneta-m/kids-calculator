import useCalculateGrid from "./useCalculateGrid";
import { renderHook, act } from "@testing-library/react";

describe("useCalculateGrid", () => {
    test("calculates the grid correctly", () => {
        const containerRef = {
            current: { clientWidth: 1200, clientHeight: 1200 }
        };
        const { result } = renderHook(() => useCalculateGrid(9, containerRef));
        expect(result.current.cols).toBe(3);
        expect(result.current.rows).toBe(3);
    });
    test("calculates horizontal grid correctly", () => {
        const containerRef = {
            current: { clientWidth: 1200, clientHeight: 600 }
        };
        const { result } = renderHook(() => useCalculateGrid(5, containerRef));
        expect(result.current.cols).toBe(3);
        expect(result.current.rows).toBe(2);
    });
    test("calculates vertical grid correctly", () => {
        const containerRef = {
            current: { clientWidth: 600, clientHeight: 1200 }
        };
        const { result } = renderHook(() => useCalculateGrid(5, containerRef));
        expect(result.current.cols).toBe(2);
        expect(result.current.rows).toBe(3);
    });
    test("recalculates the grid if window has been resized", () => {
        jest.useFakeTimers();
        const containerRef = {
            current: { clientWidth: 1200, clientHeight: 600 }
        };
        const { result } = renderHook(() => useCalculateGrid(10, containerRef));
        expect(result.current.cols).toBe(4);
        expect(result.current.rows).toBe(3);
        act(() => {
            containerRef.current = { clientWidth: 600, clientHeight: 1000 };
            jest.runAllTimers();
        });
        expect(result.current.cols).toBe(3);
        expect(result.current.rows).toBe(4);
    });
});
