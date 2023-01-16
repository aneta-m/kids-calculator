import React, { useRef, useEffect } from "react";
import IllustrationImage from "../IllustrationImage/IllustrationImage";
import styles from "./Illustration.module.scss";
import Grid from "../Grid/Grid";
import useCalculateGrid from "../useCalculateGrid";
import Flex from "../Flex/Flex";

function calculateImageDiameter(
    grid: ReturnType<typeof useCalculateGrid>,
    gapInPx?: number
) {
    const gap = gapInPx
        ? gapInPx
        : Math.min(grid.width * 0.03, grid.height * 0.03);
    const estimatedImageWidth = Math.round(
        (grid.width - gap * (grid.cols - 1)) / grid.cols
    );
    const estimatedImageHeight = Math.round(
        (grid.height - gap * (grid.rows - 1)) / grid.rows
    );
    return Math.min(estimatedImageWidth, estimatedImageHeight);
}

function calculateGridGap(grid: ReturnType<typeof useCalculateGrid>) {
    const estimatedImageWidthWithoutGap = Math.round(grid.width / grid.cols);
    const estimatedImageHeightWithoutGap = Math.round(grid.height / grid.rows);
    return (
        Math.min(
            estimatedImageHeightWithoutGap,
            estimatedImageWidthWithoutGap
        ) * 0.1
    );
}

const Illustration = ({
    amount1,
    amount2,
    type,
    imageType1,
    imageType2,
    width,
    layout,
    setImageSize
}: {
    amount1: string;
    amount2?: string;
    type?: IllustrationType | "box-shadow";
    imageType1: ImageType;
    imageType2?: ImageType;
    width?: number;
    layout?: "grid" | "flex";
    setImageSize?: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const cellsNumber = Number(amount1) + (amount2 ? Number(amount2) : 0);
    const grid = useCalculateGrid(cellsNumber, ref);
    const targetSize = width != null ? `${width}px` : "";
    let containerDimensions = {
        width: targetSize,
        height: targetSize
    };

    const gridGap = calculateGridGap(grid);
    const imageDiameter = calculateImageDiameter(grid, gridGap);
    useEffect(() => {
        setImageSize && setImageSize(imageDiameter);
    });

    const illustrationImagesList: JSX.Element[] = [];

    if (amount1) {
        for (let i = 0; i < Number(amount1); i++) {
            illustrationImagesList.push(
                <IllustrationImage
                    type={imageType1}
                    key={"n1" + i}
                    width={imageDiameter}
                />
            );
        }
    }

    if (amount2) {
        for (let i = 0; i < Number(amount2); i++) {
            illustrationImagesList.push(
                <IllustrationImage
                    type={imageType2 ? imageType2 : imageType1}
                    key={"n2" + i}
                    width={imageDiameter}
                />
            );
        }
    }

    return (
        <div
            ref={ref}
            style={width ? containerDimensions : undefined}
            className={`${styles.illustration} ${type ? styles[type] : ""}`}
        >
            {layout === "flex" ? (
                <Flex height={grid.height} width={grid.width}>
                    {illustrationImagesList}
                </Flex>
            ) : (
                <Grid
                    cells={Number(amount1) || Number(amount2)}
                    cols={grid.cols}
                    gap={gridGap}
                >
                    {illustrationImagesList}
                </Grid>
            )}
        </div>
    );
};

export default Illustration;
