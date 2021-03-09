import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpsertIncomeSourceContract } from "../../../models/income-source";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IncomeSourceDataState {

}

const initialState: IncomeSourceDataState = {};

const incomeSourceDataSlice = createSlice({
    name: "data/income-source",
    initialState: initialState,
    reducers: {
        createIncomeSource: (state, _: PayloadAction<{budgetId: string, contract: UpsertIncomeSourceContract}>) => state,
        updateIncomeSource: (state, _: PayloadAction<{budgetId: string, incomeSourceId: string, contract: UpsertIncomeSourceContract}>) => state,
        deleteIncomeSource: (state, _: PayloadAction<{budgetId: string, incomeSourceId: string}>) => state,
    },
});

export const {
    createIncomeSource,
    updateIncomeSource,
    deleteIncomeSource,
} = incomeSourceDataSlice.actions;

export default incomeSourceDataSlice.reducer;
