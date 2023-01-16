type OperationData = {
    number1: string;
    number2: string | null;
    operator: string | null;
    result: string | null;
};

type IllustratorLayout =
    | "center-s"
    | "center-l"
    | "center-xl"
    | "center-both"
    | "space-between"
    | "space-between-with-plus"
    | "center-l-double"
    | "center-l-emphasized"
    | "right-aside"
    | "right-aside-l"
    | "warning"
    | "square-xl";

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
