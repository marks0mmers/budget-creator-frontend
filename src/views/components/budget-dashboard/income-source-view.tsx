import { IncomeSource } from "../../../models/income-source";

interface Props {
    key: string;
    incomeSource: IncomeSource;
}

export const IncomeSourceView = (props: Props) => {
    return (
        <div 
            id={`income-source-${props.incomeSource.id}`}
            key={props.key}
        >
            {props.incomeSource.name}
            {props.incomeSource.amount}
        </div>
    );
}
;
