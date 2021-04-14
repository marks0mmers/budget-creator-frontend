import React, { useEffect, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLocalStorage } from "../util/use-local-storage";
import { Header } from "./components/shared/header/header";
import { ActivityLoading } from "./components/shared/activity-loading";
import { useMapDispatch, useMapState } from "../state/hooks";
import { getCurrentUser } from "../state/session/session-selectors";
import { isSessionLoading } from "../state/control/loading/loading-selectors";
import { fetchCurrentUser } from "../state/session/session-slice";

const HomePage = React.lazy(() => import("./pages/home-page"));
const LoginPage = React.lazy(() => import("./pages/login-page"));

const App = () => {
    const location = useLocation();
    const [jwtToken] = useLocalStorage("jwtToken");

    const appState = useMapState(state => ({
        currentUser: getCurrentUser(state),
        isCurrentUserLoading: isSessionLoading(state),
    }));

    const dispatch = useMapDispatch({
        fetchCurrentUser,
    });

    useEffect(() => {
        if (jwtToken && !appState.currentUser) {
            dispatch.fetchCurrentUser();
        }
    }, [appState.currentUser, jwtToken, dispatch]);

    return (
        <>
            {appState.isCurrentUserLoading && <ActivityLoading />}
            {location.pathname !== "/login" && <Header />}
            <Suspense fallback={<ActivityLoading />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
