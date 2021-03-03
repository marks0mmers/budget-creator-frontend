import styled from "styled-components";
import { LoginForm } from "../components/forms/login-form";

export const LoginPage = () => {
    return (
        <RootElement id="login-page">
            <Container id="login-container">
                <Title id="title">Login to Budget Creator</Title>
                <LoginForm />
            </Container>
        </RootElement>
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
    background: #42ABBE;
    border-radius: 40px 40px 10px 10px;
`;

const Title = styled.h1`
    height: 50px;
    width: 100%;
    color: white;
    text-align: center;
    line-height: 60px;
`;
