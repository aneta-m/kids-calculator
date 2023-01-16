import React, { useRef } from "react";
import Description from "../../Calculator/Description/Description";
import Card from "../Card/Card";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import Illustration from "../Illustration/Illustration";
import useCalculateGrid from "../useCalculateGrid";
import styles from "../Illustrator.module.scss";
import Flex from "../Flex/Flex";

const MultiplicationIllustrator = ({
    data,
    stage
}: {
    data: OperationData;
    stage: OperationStage;
}) => {
    const { number1, number2, result } = data;
    const ref = useRef<HTMLDivElement>(null);

    let variant: IllustratorLayout | null = null;
    let content;
    let grid = useCalculateGrid(Number(number2), ref);
    const isNumber1Negative = Number(number1) < 0;
    const absoluteValueNumber1 = isNumber1Negative
        ? (-Number(number1)).toString()
        : number1;
    const imageType = isNumber1Negative ? "subtract" : "primary";

    if (stage === "operator") {
        variant = "center-l";
        content = (
            <IllustratorLayout
                variant={variant}
                content={
                    <Card>
                        <Illustration
                            amount1={absoluteValueNumber1}
                            imageType1={imageType}
                        />
                    </Card>
                }
            />
        );
    }

    if (stage === "secondNumber") {
        const containerPadding = 0.1 * grid.width;
        const itemPaddingRatio = 0.05;
        const itemBorderWidth = 2;
        const cellHeight = (grid.height - containerPadding) / grid.rows;
        const cellWidth = (grid.width - containerPadding) / grid.cols;
        const illustrationSize =
            (Math.min(cellHeight, cellWidth) - 2 * itemBorderWidth) *
            (1 - 2 * itemPaddingRatio);

        const illustrations: JSX.Element[] = [];
        for (let i = 0; i < Number(number2); i++) {
            illustrations.push(
                <Card
                    padding={illustrationSize * 0.03 + "px"}
                    key={"n2-secondNumber" + i + number2}
                >
                    <Illustration
                        amount1={absoluteValueNumber1}
                        imageType1={imageType}
                        width={illustrationSize}
                    />
                </Card>
            );
        }
        content = (
            <IllustratorLayout
                variant="center-xl"
                content={
                    <Flex
                        height={grid.height - containerPadding}
                        width={grid.width - containerPadding}
                    >
                        {illustrations}
                    </Flex>
                }
            />
        );
    }

    if (stage === "result") {
        const resultAbsoluteValue =
            Number(result) < 0 ? -Number(result) : Number(result);

        content = (
            <IllustratorLayout
                variant="square-xl"
                content={
                    <Card>
                        <Illustration
                            amount1={resultAbsoluteValue.toString()}
                            imageType1={imageType}
                        />
                    </Card>
                }
            />
        );
    }
    return (
        <div className={styles.container} ref={ref}>
            {content}
            <Description state={data} size="l" />
        </div>
    );
};

export default MultiplicationIllustrator;
