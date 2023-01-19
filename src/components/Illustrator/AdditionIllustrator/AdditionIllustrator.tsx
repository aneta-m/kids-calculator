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
    const { number1, operator, number2, result } = data;

    let variant: IllustratorLayout | null = null;
    let content;
    let variant2: IllustratorLayout | null = null;
    let content2;

    const isNumber1Negative = Number(number1) < 0;
    const isResultNegative = result ? Number(result) < 0 : null;
    const image1 = isNumber1Negative ? "subtract" : "primary";

    const number1AbsoluteValue = Math.abs(Number(number1)).toString();
    const resultAbsoluteValue = Math.abs(Number(result)).toString();

    const isOperatorStage = number1 && operator && !number2 && !result;
    const isSecondNumberStage = number1 && operator && number2 && !result;
    const isResultStage = number1 && operator && number2 && result;

    if (isOperatorStage) {
        variant = "space-between-with-plus";
        content = (
            <Card>
                <Illustration
                    number1={number1AbsoluteValue}
                    type="center"
                    imageType1={image1}
                    stage={stage}
                />
            </Card>
        );
    }

    if (isSecondNumberStage) {
        variant = "space-between-with-plus";
        content = (
            <>
                <Card>
                    <Illustration
                        number1={number1AbsoluteValue}
                        type="center"
                        imageType1={image1}
                    />
                </Card>
                <Card>
                    <Illustration
                        number1={number2}
                        type="center"
                        imageType1="secondary"
                    />
                </Card>
            </>
        );
    }

    if (isResultStage) {
        variant = "center-both";
        let illustrationVariant2 = (
            <Illustration
                number1={number1}
                number2={number2}
                type="center-l"
                imageType1="primary"
                imageType2="secondary"
                stage={stage}
            />
        );
        if (isResultNegative) {
            illustrationVariant2 = (
                <Illustration
                    number1={resultAbsoluteValue}
                    type="center-l"
                    imageType1="subtract"
                    stage={stage}
                />
            );
        }
        if (isNumber1Negative && !isResultNegative) {
            illustrationVariant2 = (
                <Illustration
                    number1={result}
                    type="center-l"
                    imageType1="secondary"
                    stage={stage}
                />
            );
        }

        content = (
            <>
                <Card>
                    <Illustration
                        number1={number1AbsoluteValue}
                        type="right"
                        imageType1={image1}
                    />
                </Card>
                <Card>
                    <Illustration
                        number1={number2}
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
