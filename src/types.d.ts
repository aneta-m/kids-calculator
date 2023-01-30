type OperationData = {
    number1: string | null;
    number2: string | null;
    operator: string | null;
    result: string | null;
};

type OperationDataKey = "number1" | "number2" | "operator" | "result";

type IllustratorLayout =
    | "center-l"
    | "center-l-double"
    | "center-xl"
    | "center-both"
    | "space-between-with-plus"
    | "warning";

type OperationStage = "firstNumber" | "operator" | "secondNumber" | "result";

type ImageType = "primary" | "secondary" | "subtract" | "transparent-subtract";
