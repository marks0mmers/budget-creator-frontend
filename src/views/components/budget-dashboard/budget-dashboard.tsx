import styled from "styled-components";
import { getActiveBudget } from "../../../state/control/budget/budget-selectors";
import { useMapState } from "../../../state/hooks";
import { IncomeSources } from "./income-sources";

export const BudgetDashboard = () => {
    const appState = useMapState(state => ({
        activeBudget: getActiveBudget(state),
    }));

    return (
        <Container id="budget-dashboard">
            {appState.activeBudget?.incomeSources &&
                <IncomeSources
                    budgetId={appState.activeBudget.id}
                    incomeSources={appState.activeBudget.incomeSources}
                />
            }
        </Container>
    );
};

const Container = styled.main`
    background: rgb(250 250 250);
    padding: 20px;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 3fr;
    grid-template-areas: "income-sources .           ";
`;
