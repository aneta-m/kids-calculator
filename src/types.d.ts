type OperationData = {
    number1: string;
    number2: string | null;
    operator: string | null;
    result: string | null;
};

type IllustratorLayout =
    | "center-l"
    | "center-l-double"
    | "center-xl"
    | "center-both"
    | "space-between-with-plus"
    | "warning";

type OperationStage = "firstNumber" | "operator" | "secondNumber" | "result";

type IllustrationType =
    | "center"
    | "center-s"
    | "center-m"
    | "center-l"
    | "grid-large-gap"
    | "grid-small-gap"
    | "mix"
    | "mix-subtract"
    | "right"
    | "left";

type ImageType = "primary" | "secondary" | "subtract" | "transparent-subtract";
