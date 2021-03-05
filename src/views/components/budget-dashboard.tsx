import { getActiveBudget } from "../../state/control/budget/budget-selectors";
import { useMapState } from "../../state/hooks";

export const BudgetDashboard = () => {
    const appState = useMapState(state => ({
        activeBudget: getActiveBudget(state),
    }));

    return (
        <></>
    );
};
