import React, { useRef } from "react";
import Description from "../../Calculator/Description/Description";
import Card from "../Card/Card";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import Illustration from "../Illustration/Illustration";
import useCalculateGrid from "../useCalculateGrid";
import styles from "../Illustrator.module.scss";
import Flex from "../Flex/Flex";

const MultiplicationIllustrator = ({ data }: { data: OperationData }) => {
    const { number1, operator, number2, result } = data;
    const ref = useRef<HTMLDivElement>(null);

    let variant: IllustratorLayout | null = null;
    let content;
    let grid = useCalculateGrid(Number(number2), ref);

    const isNumber1Negative = Number(number1) < 0;
    const absoluteValueNumber1 = Math.abs(Number(number1)).toString();
    const imageType = isNumber1Negative ? "subtract" : "primary";

    const isOperatorStage = number1 && operator && !number2 && !result;
    const isSecondNumberStage = number1 && operator && number2 && !result;
    const isResultStage = number1 && operator && number2 && result;

    if (isOperatorStage) {
        variant = "center-l";
        content = (
            <IllustratorLayout
                variant={variant}
                content={
                    <Card>
                        <Illustration
                            number1={absoluteValueNumber1}
                            imageType1={imageType}
                        />
                    </Card>
                }
            />
        );
    }

    if (isSecondNumberStage || isResultStage) {
        const illustratorLayoutPadding = 0.05 * grid.width;
        const cardPaddingRatio = 0.05;
        const cardBorderWidth = 2;
        const cellHeight =
            (grid.height - 2 * illustratorLayoutPadding) / grid.rows;
        const cellWidth =
            (grid.width - 2 * illustratorLayoutPadding) / grid.cols;
        const illustrationSize =
            (Math.min(cellHeight, cellWidth) - 2 * cardBorderWidth) *
            (1 - 2 * cardPaddingRatio);

        const illustrations: JSX.Element[] = [];
        for (let i = 0; i < Number(number2); i++) {
            illustrations.push(
                <Card
                    padding={illustrationSize * cardPaddingRatio + "px"}
                    key={"n2-secondNumber-result-" + number2 + "-" + i}
                    comment={
                        isResultStage && i === 0
                            ? {
                                  type: "top",
                                  text: `${number2} group${
                                      number2 === "1" ? "" : "s"
                                  } of ${absoluteValueNumber1} apple${
                                      isNumber1Negative ? "core" : ""
                                  }${absoluteValueNumber1 === "1" ? "" : "s"}${
                                      Number(number2) > 1 ? " each." : "."
                                  } ${Math.abs(Number(result))} apple${
                                      isNumber1Negative ? "core" : ""
                                  }${
                                      Math.abs(Number(result)) === 1 ? "" : "s"
                                  } in total`
                              }
                            : undefined
                    }
                >
                    <Illustration
                        number1={absoluteValueNumber1}
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
                        height={grid.height - 2 * illustratorLayoutPadding}
                        width={grid.width - 2 * illustratorLayoutPadding}
                    >
                        {illustrations}
                    </Flex>
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
