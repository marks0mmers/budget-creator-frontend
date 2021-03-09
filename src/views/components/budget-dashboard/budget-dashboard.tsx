import styled from "styled-components";
import { getActiveBudget } from "../../../state/control/budget/budget-selectors";
import { useMapState } from "../../../state/hooks";
import { IncomeSources } from "./income-sources";

export const BudgetDashboard = () => {
    const appState = useMapState(state => ({
        activeBudget: getActiveBudget(state),
    }));

    return (
        <section id="budget-dashboard">
            <SelectBudgetLabel id="active-budget-label">{appState.activeBudget?.title ?? "No Budget Selected"}</SelectBudgetLabel>
            {appState.activeBudget?.incomeSources && <IncomeSources incomeSources={appState.activeBudget.incomeSources} />}
        </section>
    );
};

const SelectBudgetLabel = styled.h2`
    font-weight: normal;
    margin: 20px 20px;
`;
