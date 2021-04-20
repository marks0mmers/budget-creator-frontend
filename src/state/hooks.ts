import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const useMapDispatch = <T extends ActionCreatorsMapObject>(mapDispatch: T): T => {
    const dispatch = useDispatch();
    return useMemo(
        () => bindActionCreators(mapDispatch, dispatch),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch],
    );
};

export const useMapState: TypedUseSelectorHook<RootState> = useSelector;
