import React, { useState } from "react";
import AppLayout from "./components/AppLayout/AppLayout";
import Calculator from "./components/Calculator/Calculator";
import Illustrator from "./components/Illustrator/Illustrator";
import { setOperationStage } from "./utils";

function App() {
    const [operationData, setOperationData] = useState<OperationData>({
        number1: '0',
        number2: null,
        operator: null,
        result: null
    });

    const operationStage = setOperationStage(operationData);

    return (
        <>
            <AppLayout>
                <Calculator setState={setOperationData} state={operationData} stage={operationStage}/>
                <Illustrator data={operationData} stage = {operationStage}/>
            </AppLayout>
        </>
    );
}

export default App;
