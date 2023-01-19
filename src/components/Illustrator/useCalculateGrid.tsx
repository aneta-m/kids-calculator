import { useState, useEffect } from "react";

const useCalculateGrid = (
    cellsNumber: number,
    containerRef: React.RefObject<HTMLElement>,
    stage?: OperationStage
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
    }, [containerSize.width, cellsNumber, containerRef, stage]);

    function calculateVerticalGrid() {
        let colsNumber = Math.floor(Math.sqrt(cellsNumber));
        const rowsNumber = Math.ceil(Math.sqrt(cellsNumber));
        if (cellsNumber > rowsNumber * colsNumber) {
            colsNumber = colsNumber + 1;
        }
        return {
            rows: rowsNumber,
            cols: colsNumber,
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

    return calculateDefaultGrid();
};

export default useCalculateGrid;
