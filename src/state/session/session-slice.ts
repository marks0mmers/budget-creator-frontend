import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AjaxError } from "rxjs/internal-compatibility";
import { LoginContract, User } from "../../models/user";
import { Toast } from "../../util/toast";

interface SessionState {
    currentUser?: User;
}

const initialState: SessionState = {
    currentUser: undefined,
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        ajaxFailure: (_, action: PayloadAction<{err: AjaxError, failedAction?: string}>) => {
            if (action.payload.err.status === 401) {
                window.localStorage.removeItem("jwtToken");
            }
            Toast.ajaxError(action.payload.err);
        },
        login: (state, _: PayloadAction<LoginContract>) => state,
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        fetchCurrentUser: state => state,
        fetchCurrentUserSuccess: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
    },
});

export const {
    ajaxFailure,
    login,
    loginSuccess,
    fetchCurrentUser,
    fetchCurrentUserSuccess,
} = sessionSlice.actions;

export default sessionSlice.reducer;
