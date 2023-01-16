import React, { useRef, useState } from "react";
import Description from "../../Calculator/Description/Description";
import Card from "../Card/Card";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import Flex from "../Flex/Flex";
import Illustration from "../Illustration/Illustration";
import IllustrationImage from "../IllustrationImage/IllustrationImage";
import styles from "../Illustrator.module.scss";
import useCalculateGrid from "../useCalculateGrid";

const DivisionIllustrator = ({
    data,
    stage
}: {
    data: OperationData;
    stage: OperationStage;
}) => {
    const [imageSize, setImageSize] = useState<number | null>(null);
    const { number1, number2 } = data;

    let variant: IllustratorLayout | null = null;
    let content;
    const ref = useRef<HTMLDivElement>(null);
    const isNumber1Negative = Number(number1) < 0;
    const absoluteValueNumber1 = isNumber1Negative
        ? (-Number(number1)).toString()
        : number1;
    const imageType = isNumber1Negative ? "subtract" : "primary";
    const resultAbsoluteValue =
        number1 && number2
            ? Number(absoluteValueNumber1) / Number(number2)
            : null;
    let remainderAbsoluteValue: number | null = null;

    if (resultAbsoluteValue != null) {
        remainderAbsoluteValue = Number(absoluteValueNumber1) % Number(number2);
    }
    let cellsNumber = 0;
    if (number2) {
        cellsNumber =
            remainderAbsoluteValue === 0
                ? Number(number2)
                : Number(number2) + 1;
    }
    const grid = useCalculateGrid(cellsNumber, ref);

    if (stage === "operator") {
        variant = "center-l";
        content = (
            <Card>
                <Illustration
                    amount1={absoluteValueNumber1}
                    type="center"
                    imageType1={imageType}
                />
            </Card>
        );
    }

    if (
        (stage === "secondNumber" || stage === "result") &&
        resultAbsoluteValue != null &&
        isFinite(resultAbsoluteValue)
    ) {
        variant = "center-xl";
        const containerPadding = 0.05 * grid.width;
        const itemPaddingRatio = 0.05;
        const itemBorderWidth = 2;
        const cellHeight = (grid.height - 2 * containerPadding) / grid.rows;
        const cellWidth = (grid.width - 2 * containerPadding) / grid.cols;
        const illustrationSize =
            (Math.min(cellHeight, cellWidth) - 2 * itemBorderWidth) *
            (1 - 2 * itemPaddingRatio);

        const illustrations: JSX.Element[] = [];

        for (let i = 0; i < Number(number2); i++) {
            illustrations.push(
                <Card
                    padding={illustrationSize * itemPaddingRatio + "px"}
                    key={"result-secondNumber" + i}
                    comment={
                        i === 0 && stage === "result"
                            ? {
                                  type: "top",
                                  text: `${number2} container${
                                      Number(number2) === 1 ? "" : "s"
                                  } with ${Math.floor(
                                      resultAbsoluteValue
                                  )} apple${isNumber1Negative ? "core" : ""}${
                                      Math.floor(resultAbsoluteValue) === 1
                                          ? ""
                                          : "s"
                                  } in each.`
                              }
                            : undefined
                    }
                >
                    <Illustration
                        amount1={Math.floor(resultAbsoluteValue).toString()}
                        imageType1={imageType}
                        width={illustrationSize}
                        setImageSize={
                            remainderAbsoluteValue &&
                            remainderAbsoluteValue < resultAbsoluteValue
                                ? setImageSize
                                : undefined
                        }
                    />
                </Card>
            );
        }

        if (remainderAbsoluteValue) {
            if (remainderAbsoluteValue < resultAbsoluteValue && imageSize) {
                const imagesList = [];
                for (let i = 0; i < remainderAbsoluteValue; i++) {
                    imagesList.push(
                        <IllustrationImage
                            width={imageSize}
                            type={imageType}
                            key={"remainder_illustration_image" + i}
                        />
                    );
                }
                illustrations.push(
                    <Card
                        padding={illustrationSize * itemPaddingRatio + "px"}
                        key={"remainder-secondNumber" + number2}
                        variant="light"
                        comment={
                            stage === "result"
                                ? {
                                      type: "bottom",
                                      text: `${remainderAbsoluteValue} apple${
                                          isNumber1Negative ? "core" : ""
                                      }${
                                          remainderAbsoluteValue === 1
                                              ? ""
                                              : "s"
                                      } left over.`
                                  }
                                : undefined
                        }
                    >
                        <Flex
                            height={illustrationSize}
                            width={illustrationSize}
                        >
                            {imagesList}
                        </Flex>
                    </Card>
                );
            } else {
                illustrations.push(
                    <Card
                        padding={illustrationSize * itemPaddingRatio + "px"}
                        key={"remainder-secondNumber" + number2}
                        variant="light"
                        comment={
                            stage === "result"
                                ? { type: "bottom", text: "Remainder" }
                                : undefined
                        }
                    >
                        <Illustration
                            amount1={remainderAbsoluteValue.toString()}
                            imageType1={imageType}
                            width={illustrationSize}
                        />
                    </Card>
                );
            }
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

    if (number2 && !isFinite(resultAbsoluteValue!)) {
        variant = "warning";
        content = <p>"You cannot devide by 0!"</p>;
    }

    if (stage === "result") {
    }
    return (
        <>
            <div className={styles.container} ref={ref}>
                {variant && content && (
                    <IllustratorLayout variant={variant} content={content} />
                )}
                <Description state={data} size="l" />
            </div>
        </>
    );
};

export default DivisionIllustrator;
