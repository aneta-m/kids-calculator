import React from "react";
import styles from "./Illustrator.module.scss";
import Card from "./Card/Card";
import IllustratorLayout from "./IllustratorLayout/IllustratorLayout";
import Illustration from "./Illustration/Illustration";
import Description from "../Calculator/Description/Description";
import AdditionIllustrator from "./AdditionIllustrator/AdditionIllustrator";
import MultiplicationIllustrator from "./MultiplicationIllustrator/MultiplicationIllustrator";
import SubtractionIllustrator from "./SubtractionIllustrator/SubtractionIllustrator";
import DivisionIllustrator from "./DivisionIllustrator/DivisionIllustrator";

const Illustrator = ({
    data,
    stage
}: {
    data: OperationData;
    stage: OperationStage;
}) => {
    const { number1, operator } = data;

    if (operator === "+") {
        return <AdditionIllustrator data={data} stage={stage} />;
    }
    if (operator === "-") {
        return <SubtractionIllustrator data={data} />;
    }
    if (operator === "*") {
        return <MultiplicationIllustrator data={data} />;
    }
    if (operator === "/") {
        return <DivisionIllustrator data={data} />;
    }
    return (
        <div className={styles.container}>
            <IllustratorLayout
                variant="center-l"
                content={
                    <Card>
                        <Illustration
                            number1={number1}
                            type="center"
                            imageType1="primary"
                        />
                    </Card>
                }
            />
            <Description state={data} size="l" />
        </div>
    );
};

export default Illustrator;
