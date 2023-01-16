import React from "react";
import styles from "./Illustrator.module.scss";
import Card from "../Card/Card";
import IllustratorLayout from "../IllustratorLayout/IllustratorLayout";
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
        return <SubtractionIllustrator data={data} stage={stage} />;
    }
    if (operator === "*") {
        return <MultiplicationIllustrator data={data} stage={stage} />;
    }
    if (operator === "/") {
        return <DivisionIllustrator data={data} stage={stage} />;
    }
    return (
        <div className={styles.container}>
            <IllustratorLayout
                variant="center-l"
                content={
                    <Card>
                        <Illustration
                            amount1={number1}
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

//     const { number1, number2, operator, result } = data;

//     let variant: IllustratorLayout | null = null;
//     let content;
//     let variant2: IllustratorLayout | null = null;
//     let content2;

//     if (stage === 'firstNumber') {
//         variant = "center-s";
//         content = (
//             <>
//                 <Card>
//                     <Illustration amount1={number1} type='center' imageType1='primary'/>
//                 </Card>
//             </>
//         );
//     }

//     if(operator === '+') {
//         if (stage === 'operator') {
//             variant = "space-between-with-plus";
//             content = (Number(number1) < 0 ?
//                 <Card>
//                     <Illustration amount1={(-Number(number1)).toString()} type='center' imageType1={'subtract'} />
//                 </Card>
//             :
//                 <Card>
//                     <Illustration amount1={number1} type='center' imageType1={'primary'} />
//                 </Card>

//             );
//         }

//         if (stage === 'secondNumber') {
//             variant = 'space-between-with-plus'
//             content = (Number(number1) < 0 ?
//             <>
//             <Card>
//                 <Illustration amount1={(-Number(number1)).toString()} type='center' imageType1={'subtract'} />
//             </Card>
//             <Card>
//                 <Illustration amount1={number2!} type='center' imageType1='secondary'/>
//             </Card>
//             </>

//         :
//                 <>
//                 <Card>
//                     <Illustration amount1={number1} type='center' imageType1={'primary'} />
//                 </Card>
//                 <Card>
//                     <Illustration amount1={number2!} type='center' imageType1='secondary'/>
//                 </Card>
//                 </>
//             );
//         }

//         if (stage === 'result') {
//             variant = "center-both";
//             let illustrationVariant2 = <Illustration amount1={number1} amount2={number2!} type='center-l' imageType1='primary' imageType2='secondary'/>;
//             if (Number(result) <= 0) {
//                 illustrationVariant2 = <Illustration amount1={(-Number(result)).toString()} type='center-l' imageType1='subtract' />
//             }
//             if (Number(number1) < 0 && Number(result) > 0) {
//                 illustrationVariant2 = <Illustration amount1={result!} type='center-l' imageType1='secondary' />
//             }

//             content = (
//                 <>
//                 <Card>
//                     {Number(number1) < 0 ?
//                     <Illustration amount1={(-Number(number1)).toString()} type='right' imageType1='subtract'/>
//                         :
//                     <Illustration amount1={number1} type='right' imageType1='primary'/>}
//                 </Card>
//                 <Card>
//                     <Illustration amount1={number2!} type='left' imageType1='secondary'/>
//                 </Card>
//                 </>
//             );
//             variant2 = 'center-l-double';
//             content2 = <Card>
//                 {illustrationVariant2}
//             </Card>
//         }

//     }

//     if(operator === '-') {
//
//     }

//     if (operator === '*') {

//         const ref = useRef<HTMLDivElement>(null);
//         if (stage === 'operator') {
//             variant = "center-s";
//             content = (
//                 <Card>
//                     <Illustration amount1={number1} type='center' imageType1='primary'/>
//                 </Card>
//             );
//         }

//         if (stage === 'secondNumber') {
//             // variant = 'grid'
//             const grid = useCalculateGrid(Number(number2!), ref)
//             content = (
//                 <>
//                 {/* <Grid cells={Number(number1) * Number(number2)} cols>
//                     <Illustration amount1={number1} amount2={number2!} type='grid-large-gap' imageType1='primary' imageType2='primary'/>
//                 </Grid> */}
//                 </>
//             );
//         }

//         if (stage === 'result') {
//             variant = "center-l";
//             content = (
//                 <Card>
//                     <Illustration amount1={number1} amount2={number2!} type='grid-small-gap' imageType1='primary' imageType2='primary'/>
//                 </Card>
//             );
//         }
//     }

//     if (operator === '/') {
//
//     }

//     return (
//         <>
//         <div className={styles.container}>
//             {variant && content && <IllustratorLayout variant = {variant} content = {content} variant2 = {variant2} content2 = {content2}/>}
//             <Description state={data} size='l'/>
//         </div>
//         </>
//     );
// };

export default Illustrator;

// IllustractorLayout type: centered-s, centered-l, 2 items centered, space between 2 items
