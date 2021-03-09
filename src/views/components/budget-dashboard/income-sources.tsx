import { Map } from "immutable";
import { IncomeSource } from "../../../models/income-source";
import { IncomeSourceView } from "./income-source-view";

interface Props {
    incomeSources: Map<string, IncomeSource>
}

export const IncomeSources = (props: Props) => {
    return (
        <section id="income-sources">
            Income Sources:
            {props.incomeSources.map((incomeSource, id) => (
                <IncomeSourceView incomeSource={incomeSource} key={id}/>
            ))}
        </section>
    );
};
