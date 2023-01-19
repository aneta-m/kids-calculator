import React, { useRef, useState } from "react";
import Description from "../../Calculator/Description/Description";
import Card from "../Card/Card";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import Flex from "../Flex/Flex";
import Illustration from "../Illustration/Illustration";
import IllustrationImage from "../IllustrationImage/IllustrationImage";
import styles from "../Illustrator.module.scss";
import useCalculateGrid from "../useCalculateGrid";

const DivisionIllustrator = ({ data }: { data: OperationData }) => {
    const [imageSize, setImageSize] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const { number1, operator, number2, result } = data;
    let variant: IllustratorLayout | null = null;
    let content;

    const isNumber1Negative = Number(number1) < 0;
    const absoluteValueNumber1 = Math.abs(Number(number1)).toString();
    const imageType = isNumber1Negative ? "subtract" : "primary";
    const resultAbsoluteValue =
        number1 && number2
            ? Number(absoluteValueNumber1) / Number(number2)
            : null;
    let remainderAbsoluteValue: number | null = null;

    const isOperatorStage = number1 && operator && !number2 && !result;
    const isSecondNumberStage = number1 && operator && number2 && !result;
    const isResultStage = number1 && operator && number2 && result;

    if (resultAbsoluteValue != null) {
        remainderAbsoluteValue = Number(absoluteValueNumber1) % Number(number2);
    }
    let cardsNumber = 0;
    if (number2) {
        cardsNumber =
            remainderAbsoluteValue === 0
                ? Number(number2)
                : Number(number2) + 1;
    }
    const grid = useCalculateGrid(cardsNumber, ref);

    if (isOperatorStage) {
        variant = "center-l";
        content = (
            <Card>
                <Illustration
                    number1={absoluteValueNumber1}
                    imageType1={imageType}
                />
            </Card>
        );
    }

    if (
        (isSecondNumberStage || isResultStage) &&
        resultAbsoluteValue != null &&
        isFinite(resultAbsoluteValue)
    ) {
        variant = "center-xl";
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
                        i === 0 && isResultStage
                            ? {
                                  type: "top",
                                  text: `${number2} group${
                                      number2 === "1" ? "" : "s"
                                  } of ${Math.floor(
                                      resultAbsoluteValue
                                  )} apple${isNumber1Negative ? "core" : ""}${
                                      Math.floor(resultAbsoluteValue) === 1
                                          ? ""
                                          : "s"
                                  } ${number2 === "1" ? "" : "each"}`
                              }
                            : undefined
                    }
                >
                    <Illustration
                        number1={Math.floor(resultAbsoluteValue).toString()}
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
                        padding={illustrationSize * cardPaddingRatio + "px"}
                        key={"remainder-secondNumber" + number2}
                        variant="light"
                        comment={
                            isResultStage
                                ? {
                                      type: "bottom",
                                      text: `${remainderAbsoluteValue} apple${
                                          isNumber1Negative ? "core" : ""
                                      }${
                                          remainderAbsoluteValue === 1
                                              ? ""
                                              : "s"
                                      } left over`
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
                        padding={illustrationSize * cardPaddingRatio + "px"}
                        key={"remainder-secondNumber" + number2}
                        variant="light"
                        comment={
                            isResultStage
                                ? {
                                      type: "bottom",
                                      text: `${remainderAbsoluteValue} apple${
                                          isNumber1Negative ? "core" : ""
                                      }${
                                          remainderAbsoluteValue === 1
                                              ? ""
                                              : "s"
                                      } left over`
                                  }
                                : undefined
                        }
                    >
                        <Illustration
                            number1={remainderAbsoluteValue.toString()}
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
                        height={grid.height - 2 * illustratorLayoutPadding}
                        width={grid.width - 2 * illustratorLayoutPadding}
                    >
                        {illustrations}
                    </Flex>
                }
            />
        );
    }

    if (resultAbsoluteValue && !isFinite(resultAbsoluteValue)) {
        variant = "warning";
        content = <p>"You cannot devide by 0!"</p>;
    }

    return (
        <div className={styles.container} ref={ref}>
            {variant && content && (
                <IllustratorLayout variant={variant} content={content} />
            )}
            <Description state={data} size="l" />
        </div>
    );
};

export default DivisionIllustrator;
