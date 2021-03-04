import { combineReducers } from "redux";
import { BudgetControlReducer, BudgetControlState } from "./control/budget/budget-reducers";
import { loadingReducer, LoadingState } from "./control/loading/reducers";
import { BudgetDataReducer, BudgetDataState } from "./data/budget/budget-reducers";
import { SessionReducer, SessionState } from "./session/session-reducers";

export interface RootState {
    control: {
        budget: BudgetControlState;
        loading: LoadingState;
    };
    data: {
        budget: BudgetDataState;
    };
    session: SessionState;
}

export const rootReducer = combineReducers({
    control: combineReducers({
        budget: BudgetControlReducer,
        loading: loadingReducer,
    }),
    data: combineReducers({
        budget: BudgetDataReducer,
    }),
    session: SessionReducer,
});
