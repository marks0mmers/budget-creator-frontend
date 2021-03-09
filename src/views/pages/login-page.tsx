import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { isSessionLoading } from "../../state/control/loading/loading-selectors";
import { useMapState } from "../../state/hooks";
import { getCurrentUser } from "../../state/session/session-selectors";
import { LoginForm } from "../forms/login-form";
import { ActivityLoading } from "../components/shared/activity-loading";

export const LoginPage = () => {
    const history = useHistory();

    const appState = useMapState(state => ({
        currentUser: getCurrentUser(state),
        isLoginLoading: isSessionLoading(state),
    }));

    useEffect(() => {
        if (appState.currentUser) {
            history.push("/");
        }
    }, [appState.currentUser, history]);

    return (
        <>
            {appState.isLoginLoading && <ActivityLoading />}
            <RootElement id="login-page">
                <Container id="login-container">
                    <Title id="title">Login to Budget Creator</Title>
                    <LoginForm />
                </Container>
            </RootElement>
        </>
    );
};

const RootElement = styled.main`
    display: grid;
    grid-template-rows: 1fr auto 2fr;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
        ". . ."
        ". container ."
        ". . .";

    background: lightgray;
`;

const Container = styled.section`
    grid-area: container;

    width: 420px;
    background: rgb(185, 23, 23);
    border-radius: 40px 40px 10px 10px;
`;

const Title = styled.h1`
    height: 50px;
    width: 100%;
    color: white;
    text-align: center;
    line-height: 60px;
`;
