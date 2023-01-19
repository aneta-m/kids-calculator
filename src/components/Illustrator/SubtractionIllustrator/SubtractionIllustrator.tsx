import React from "react";
import Card from "../Card/Card";
import Illustration from "../Illustration/Illustration";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
import styles from "../Illustrator.module.scss";
import Description from "../../Calculator/Description/Description";

const SubtractionIllustrator = ({ data }: { data: OperationData }) => {
    const { number1, number2, operator, result } = data;

    let variant: IllustratorLayout | null = null;
    let content;
    let variant2: IllustratorLayout | null = null;
    let content2;

    const isOperatorStage = number1 && operator && !number2 && !result;
    const isSecondNumberStage = number1 && operator && number2 && !result;
    const isResultStage = number1 && operator && number2 && result;

    if (isOperatorStage) {
        variant = "center-l";
        content = (
            <Card>
                <Illustration
                    number1={Math.abs(Number(number1)).toString()}
                    type="center"
                    imageType1={Number(number1) < 0 ? "subtract" : "primary"}
                />
            </Card>
        );
    }

    if (isSecondNumberStage) {
        variant = "center-l";
        const result = Number(number1) - Number(number2);
        let illustration = (
            <Illustration
                number1={result.toString()}
                number2={number2}
                type="center"
                imageType1="primary"
                imageType2="subtract"
            />
        );
        if (result < 0) {
            illustration =
                Number(number1) > 0 ? (
                    <Illustration
                        number1={number2}
                        type="center"
                        imageType1="subtract"
                    />
                ) : (
                    <Illustration
                        number1={(-Number(number1)).toString()}
                        number2={number2}
                        type="center"
                        imageType1="subtract"
                        imageType2="subtract"
                    />
                );
        }

        content = <Card>{illustration}</Card>;
    }

    if (isResultStage) {
        variant = "center-l";
        const result = Number(number1) - Number(number2);
        let illustration = (
            <Illustration
                number1={result.toString()}
                number2={number2}
                type="center"
                imageType1="primary"
                imageType2="transparent-subtract"
            />
        );
        let illustration2: JSX.Element | undefined = (
            <Illustration
                number1={result.toString()}
                type="center"
                imageType1="primary"
            />
        );
        let cardComment: { type: "top" | "bottom"; text: string } | null = null;
        if (result < 0) {
            illustration =
                Number(number1) > 0 ? (
                    <Illustration
                        number1={number1}
                        number2={(-result).toString()}
                        type="center"
                        imageType1="transparent-subtract"
                        imageType2="subtract"
                    />
                ) : (
                    <Illustration
                        number1={(-Number(number1)).toString()}
                        number2={number2}
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
                              number2 === "1" ? "" : "s"
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
