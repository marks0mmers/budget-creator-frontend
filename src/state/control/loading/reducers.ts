import { Map, Record } from "immutable";

export enum LoadingActionTypes {
    SET_LOADING_INDICATOR = "loading/SET_LOADING_INDICATOR",
    REMOVE_LOADING_INDICATOR = "loading/REMOVE_LOADING_INDICATOR",
}

export const setLoadingIndicator = (action: string) => {
    return {
        action,
        type: LoadingActionTypes.SET_LOADING_INDICATOR as const,
    };
};

export type SetLoadingIndicator = ReturnType<typeof setLoadingIndicator>;

export const removeLoadingIndicator = (action: string) => {
    return {
        action,
        type: LoadingActionTypes.REMOVE_LOADING_INDICATOR as const,
    };
};

export type RemoveLoadingIndicator = ReturnType<typeof removeLoadingIndicator>;

type LoadingActions = SetLoadingIndicator | RemoveLoadingIndicator;

export interface LoadingState {
    loadingIndicators: Map<string, boolean>;
}

export const LoadingStateRecord = Record<LoadingState>({
    loadingIndicators: Map<string, boolean>(),
});

export const loadingReducer = (state = new LoadingStateRecord(), action: LoadingActions): LoadingState => {
    switch (action.type) {
    case LoadingActionTypes.SET_LOADING_INDICATOR:
        return state.setIn(["loadingIndicators", action.action], true);
    case LoadingActionTypes.REMOVE_LOADING_INDICATOR:
        return state.removeIn(["loadingIndicators", action.action]);
    default:
        return state;
    }
};
