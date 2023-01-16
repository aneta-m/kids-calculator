import { useState, useEffect } from "react";

const useCalculateGrid = (
    cellsAmount: number,
    containerRef: React.RefObject<HTMLElement>,
    orientation?: "horizontal" | "vertical"
) => {
    const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });

    useEffect(() => {
        function setContainerSizeState() {
            if (containerRef.current) {
                setContainerSize({
                    height: containerRef.current.clientHeight,
                    width: containerRef.current.clientWidth
                });
            }
        }
        setContainerSizeState();
        if (containerSize.width) {
            setTimeout(setContainerSizeState, 600);
        }
        window.addEventListener("resize", setContainerSizeState);
        return () => {
            window.removeEventListener("resize", setContainerSizeState);
        };
    }, [containerSize.width, cellsAmount, containerRef]);

    function calculateVerticalGrid() {
        let colsAmount = Math.floor(Math.sqrt(cellsAmount));
        const rowsAmount = Math.ceil(Math.sqrt(cellsAmount));
        if (cellsAmount > rowsAmount * colsAmount) {
            colsAmount = colsAmount + 1;
        }
        return {
            rows: rowsAmount,
            cols: colsAmount,
            height: containerSize.height,
            width: containerSize.width
        };
    }

    function calculateHorizontalGrid() {
        const grid = calculateVerticalGrid();
        const rows = grid.cols;
        const cols = grid.rows;
        grid.rows = rows;
        grid.cols = cols;
        return grid;
    }

    function calculateDefaultGrid() {
        return containerSize.width > containerSize.height
            ? calculateHorizontalGrid()
            : calculateVerticalGrid();
    }

    if (orientation === "vertical") {
        return calculateVerticalGrid();
    }

    if (orientation === "horizontal") {
        return calculateHorizontalGrid();
    }

    return calculateDefaultGrid();
};

export default useCalculateGrid;
