import { useEffect, useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useLocalStorage } from "../util/use-local-storage";
import { Toast } from "../util/toast";
import { useFetch } from "../util/fetch-builder";
import { User, UserContract } from "../models/user";
import { store, useStateValue } from "../state/store";
import { SetCurrentUserCreator } from "../state/actions";
import { Header } from "./components/shared/header/header";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { ActivityLoading } from "./components/shared/activity-loading";

const App = () => {
    const location = useLocation();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken");
    const { dispatch } = useContext(store);
    const currentUser = useStateValue(state => state.currentUser);

    const [userContract, isCurrentUserLoading, currentUserError] = useFetch<UserContract>(
        "/api/users/me",
        [jwtToken, currentUser],
        () => !!jwtToken && !currentUser,
    );
    useEffect(() => {
        if (userContract) {
            const user = new User(userContract);
            dispatch(SetCurrentUserCreator(user));
        }
    }, [userContract, dispatch]);

    useEffect(() => {
        if (currentUserError) {
            setJwtToken("");
            Toast.error("Failed to get current user");
        }
    }, [currentUserError, setJwtToken]);

    return (
        <>
            {isCurrentUserLoading && <ActivityLoading />}
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
