import React from "react";
import Card from "../Card/Card";
import Illustration from "../Illustration/Illustration";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import styles from "../Illustrator.module.scss";
import Description from "../../Calculator/Description/Description";

const SubtractionIllustrator = ({
    data,
    stage
}: {
    data: OperationData;
    stage: OperationStage;
}) => {
    const { number1, number2 } = data;

    let variant: IllustratorLayout | null = null;
    let content;
    let variant2: IllustratorLayout | null = null;
    let content2;

    if (stage === "operator") {
        variant = "center-l";
        content = (
            <Card>
                <Illustration
                    amount1={
                        Number(number1) < 0
                            ? (-Number(number1)).toString()
                            : number1
                    }
                    type="center"
                    imageType1={Number(number1) < 0 ? "subtract" : "primary"}
                />
            </Card>
        );
    }

    if (stage === "secondNumber") {
        variant = "center-l";
        const result = Number(number1) - Number(number2);
        let illustration = (
            <Illustration
                amount1={result.toString()}
                amount2={number2!}
                type="center"
                imageType1="primary"
                imageType2="subtract"
            />
        );
        if (result < 0) {
            illustration =
                Number(number1) > 0 ? (
                    <Illustration
                        amount1={number2!}
                        type="center"
                        imageType1="subtract"
                    />
                ) : (
                    <Illustration
                        amount1={(-Number(number1)).toString()}
                        amount2={number2!}
                        type="center"
                        imageType1="subtract"
                        imageType2="subtract"
                    />
                );
        }

        content = <Card>{illustration}</Card>;
    }

    if (stage === "result") {
        variant = "center-l";
        const result = Number(number1) - Number(number2);
        let illustration = (
            <Illustration
                amount1={result.toString()}
                amount2={number2!}
                type="center"
                imageType1="primary"
                imageType2="transparent-subtract"
            />
        );
        let illustration2: JSX.Element | undefined = (
            <Illustration
                amount1={result.toString()}
                type="center"
                imageType1="primary"
            />
        );
        let cardComment: { type: "top" | "bottom"; text: string } | null = null;
        if (result < 0) {
            illustration =
                Number(number1) > 0 ? (
                    <Illustration
                        amount1={number1}
                        amount2={(-result).toString()}
                        type="center"
                        imageType1="transparent-subtract"
                        imageType2="subtract"
                    />
                ) : (
                    <Illustration
                        amount1={(-Number(number1)).toString()}
                        amount2={number2!}
                        type="center"
                        imageType1="subtract"
                        imageType2="subtract"
                    />
                );
            cardComment = {
                type: "top",
                text:
                    Number(number1) >= 0
                        ? `You ate more than you had! You will have to return ${-result} apple${
                              -result === 1 ? "" : "s"
                          }.`
                        : `You had ${-number1} apple${
                              -number1 === 1 ? "" : "s"
                          } to return and now you ate another ${number2} apple${
                              Number(number2) === 1 ? "" : "s"
                          }. You will have to return ${-result} apple${
                              -result === 1 ? "" : "s"
                          }.`
            };
        }

        content = <Card>{illustration}</Card>;
        content2 = (
            <Card comment={cardComment ? cardComment : undefined}>
                {illustration2 ? illustration2 : illustration}
            </Card>
        );
    }

    return (
        <div className={styles.container}>
            {variant && content && (
                <IllustratorLayout
                    variant={variant}
                    content={content}
                    variant2={variant2 ? variant2 : undefined}
                    content2={content2 ? content2 : undefined}
                />
            )}
            <Description state={data} size="l" />
        </div>
    );
};

export default SubtractionIllustrator;
