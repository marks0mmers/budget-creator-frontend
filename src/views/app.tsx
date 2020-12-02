import React, { useCallback, useEffect, useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useLocalStorage } from "../util/use-local-storage";
import { Toast } from "../util/toast";
import { http } from "../util/fetch-builder";
import { User } from "../models/user";
import { store, useStateValue } from "../state/store";
import { SetCurrentUserCreator } from "../state/actions";
import { Header } from "./components/shared/header";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";

const App = () => {
    const location = useLocation();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken");
    const { dispatch } = useContext(store);
    const currentUser = useStateValue(state => state.currentUser);

    const fetchCurrentUser = useCallback(async () => {
        try {
            const data = await http<User>("/api/users/me");
            const user = new User(data.parsedBody);
            dispatch(SetCurrentUserCreator(user));
        } catch(error) {
            setJwtToken("");
            Toast.error("Failed to get current user");
        }
    }, [dispatch, setJwtToken]);

    useEffect(() => {
        if (jwtToken && !currentUser) {
            fetchCurrentUser();
        }
    }, [jwtToken, fetchCurrentUser, currentUser]);

    return (
        <>
            {location.pathname !== "/login" && <Header />}
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </>
    );
};

export default App;
