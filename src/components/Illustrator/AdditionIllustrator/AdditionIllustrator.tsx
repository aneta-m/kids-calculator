import React from "react";
import Description from "../../Calculator/Description/Description";
import Card from "../Card/Card";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import Illustration from "../Illustration/Illustration";
import styles from "../Illustrator.module.scss";

const AdditionIllustrator = ({
    data,
    stage
}: {
    data: OperationData;
    stage: OperationStage;
}) => {
    const { number1, number2, result } = data;

    let variant: IllustratorLayout | null = null;
    let content;
    let variant2: IllustratorLayout | null = null;
    let content2;
    const isNumber1Negative = Number(number1) < 0;
    const isResultNegative = result ? Number(result) < 0 : null;
    const image1 = isNumber1Negative ? "subtract" : "primary";
    const resultImage = isResultNegative ? "subtract" : "primary";
    const number1AbsoluteValue = isNumber1Negative
        ? (-Number(number1)).toString()
        : number1;
    const resultAbsoluteValue = isResultNegative
        ? (-Number(result)).toString()
        : number1;

    if (stage === "operator") {
        variant = "space-between-with-plus";
        content = (
            <Card>
                <Illustration
                    amount1={number1AbsoluteValue}
                    type="center"
                    imageType1={image1}
                />
            </Card>
        );
    }

    if (stage === "secondNumber") {
        variant = "space-between-with-plus";
        content = (
            <>
                <Card>
                    <Illustration
                        amount1={number1AbsoluteValue}
                        type="center"
                        imageType1={image1}
                    />
                </Card>
                <Card>
                    <Illustration
                        amount1={number2!}
                        type="center"
                        imageType1="secondary"
                    />
                </Card>
            </>
        );
    }

    if (stage === "result") {
        variant = "center-both";
        let illustrationVariant2 = (
            <Illustration
                amount1={number1}
                amount2={number2!}
                type="center-l"
                imageType1="primary"
                imageType2="secondary"
            />
        );
        if (isResultNegative) {
            illustrationVariant2 = (
                <Illustration
                    amount1={resultAbsoluteValue}
                    type="center-l"
                    imageType1="subtract"
                />
            );
        }
        if (isNumber1Negative && !isResultNegative) {
            illustrationVariant2 = (
                <Illustration
                    amount1={result!}
                    type="center-l"
                    imageType1="secondary"
                />
            );
        }

        content = (
            <>
                <Card>
                    <Illustration
                        amount1={number1AbsoluteValue}
                        type="right"
                        imageType1={image1}
                    />
                </Card>
                <Card>
                    <Illustration
                        amount1={number2!}
                        type="left"
                        imageType1="secondary"
                    />
                </Card>
            </>
        );
        variant2 = "center-l-double";
        content2 = <Card>{illustrationVariant2}</Card>;
    }

    return (
        <div className={styles.container}>
            {variant && content && (
                <IllustratorLayout
                    variant={variant}
                    content={content}
                    variant2={variant2}
                    content2={content2}
                />
            )}
            <Description state={data} size="l" />
        </div>
    );
};

export default AdditionIllustrator;
