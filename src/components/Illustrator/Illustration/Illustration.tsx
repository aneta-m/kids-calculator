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
    number1,
    number2,
    imageType1,
    imageType2,
    width,
    layout,
    setImageSize,
    stage
}: {
    number1: string;
    number2?: string;
    imageType1: ImageType;
    imageType2?: ImageType;
    width?: number;
    layout?: "grid" | "flex";
    setImageSize?: React.Dispatch<React.SetStateAction<number | null>>;
    stage?: OperationStage;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const cellsNumber = Number(number1) + (number2 ? Number(number2) : 0);
    const grid = useCalculateGrid(cellsNumber, ref, stage);
    const targetSize = width != null ? `${width}px` : "";
    let containerDimensions = {
        width: targetSize,
        height: targetSize
    };

    const gridGap = calculateGridGap(grid);
    let imageDiameter = calculateImageDiameter(grid, gridGap);

    useEffect(() => {
        setImageSize && setImageSize(imageDiameter);
    });

    const illustrationImagesList: JSX.Element[] = [];

    if (number1) {
        for (let i = 0; i < Number(number1); i++) {
            illustrationImagesList.push(
                <IllustrationImage
                    type={imageType1}
                    key={"n1-" + i}
                    width={imageDiameter}
                />
            );
        }
    }

    if (number2) {
        for (let i = 0; i < Number(number2); i++) {
            illustrationImagesList.push(
                <IllustrationImage
                    type={imageType2 ? imageType2 : imageType1}
                    key={"n2-" + i}
                    width={imageDiameter}
                />
            );
        }
    }

    return (
        <div
            ref={ref}
            style={width ? containerDimensions : {}}
            className={styles.illustration}
        >
            {layout === "flex" ? (
                <Flex height={grid.height} width={grid.width}>
                    {illustrationImagesList}
                </Flex>
            ) : (
                <Grid cols={grid.cols} gap={gridGap}>
                    {illustrationImagesList}
                </Grid>
            )}
        </div>
    );
};

export default Illustration;
