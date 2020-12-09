import { createContext, useReducer, Dispatch, useContext, ReactNode } from "react";
import { Record } from "immutable";
import { User } from "../models/user";
import { Budget } from "../models/budget";
import { Action, ActionTypes } from "./actions";

interface IState {
    currentUser?: User;
    activeBudget?: Budget;
}

class State extends Record<IState>({
    currentUser: undefined,
    activeBudget: undefined,
}) {}

const initialState = new State();
export const store = createContext<{state: State, dispatch: Dispatch<Action>}>({state: initialState, dispatch: (value: Action) => {throw Error();}});
const { Provider } = store;

export const StateProvider = (props: {children?: ReactNode}) => {
    const [state, dispatch] = useReducer((state: State, action: Action) => {
        switch(action.type) {
        case ActionTypes.SET_CURRENT_USER:
            return state.set("currentUser", action.user);
        case ActionTypes.SET_ACTIVE_BUDGET:
            return state.set("activeBudget", action.budget);
        default:
            throw Error();
        }
    }, initialState);

    return (<Provider value={{state, dispatch}}>{props.children}</Provider>);
};

export const useStateValue = <T, >(selector: (state: State) => T) => {
    const state = useContext(store);
    return selector(state.state);
};
