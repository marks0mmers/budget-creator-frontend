import { useCallback } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useHistory } from "react-router-dom";
import { Input, LabelInput, Error, Required } from "../shared/input";
import { Button } from "../shared/button";
import { ActivityLoading } from "../shared/activity-loading";
import { useMapDispatch, useMapState } from "../../../state/hooks";
import { LoginCreator } from "../../../state/session/session-actions";
import { isSessionLoading } from "../../../state/control/loading/selectors";

interface LoginUserForm {
    username: string;
    password: string;
}

export const LoginForm = () => {
    const history = useHistory();

    const appState = useMapState(state => ({
        isLoginLoading: isSessionLoading(state),
    }));

    const dispatch = useMapDispatch({
        login: LoginCreator,
    });

    const handleSubmit = useCallback((values: LoginUserForm) => {
        dispatch.login(values.username, values.password);
        history.push("/");
    }, [dispatch, history]);

    const formik = useFormik<LoginUserForm>({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: handleSubmit,
        validationSchema: object().shape({
            username: string().required("Username is required"),
            password: string().required("Password is required"),
        }),
    });

    return (
        <>
            {appState.isLoginLoading && <ActivityLoading />}
            <Form id="login-form" onSubmit={formik.handleSubmit}>
                <LabelInput id="username-label">
                    Username:
                    <Required />
                    <Input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.errors.username && <Error>{formik.errors.username}</Error>}
                </LabelInput>
                <LabelInput id="password-label">
                    Password:
                    <Required />
                    <Input
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.errors.password && <Error>{formik.errors.password}</Error>}
                </LabelInput>
                <Button
                    type="submit"
                    text="Submit"
                    height={40}
                />
            </Form>
        </>
    );
};

const Form = styled.form`
    width: 360px;
    margin: 10px 10px 10px 10px;
    background: white;
    padding: 20px;
`;
