import { useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import { FormikHelpers, useFormik } from "formik";
import { object, string } from "yup";
import { useHistory } from "react-router-dom";
import { store } from "../../../state/store";
import { Input, LabelInput, Error, Required } from "../shared/input";
import { Button } from "../shared/button";
import { User } from "../../../models/user";
import { SetCurrentUserCreator } from "../../../state/actions";
import { useHttp } from "../../../util/fetch-builder";
import { useLocalStorage } from "../../../util/use-local-storage";
import { Toast } from "../../../util/toast";
import { ActivityLoading } from "../shared/activity-loading";

interface LoginUserForm {
    username: string;
    password: string;
}

export const LoginForm = () => {
    const [loginRequest, isLoginLoading, loginError] = useHttp<User & {token: string}>("/api/users/login", "POST");
    const { dispatch } = useContext(store);
    const history = useHistory();
    const [, setJwtToken] = useLocalStorage("jwtToken");

    useEffect(() => {
        if (loginError) {
            Toast.error("Failed to Login");
        }
    }, [loginError]);

    const handleSubmit = useCallback(async (values: LoginUserForm, formikHelpers: FormikHelpers<LoginUserForm>) => {
        const data = await loginRequest(values);
        setJwtToken(data?.token);
        const user = new User(data);
        dispatch(SetCurrentUserCreator(user));
        formikHelpers.setSubmitting(false);
        history.push("/");
    }, [dispatch, history, setJwtToken, loginRequest]);

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
            {isLoginLoading && <ActivityLoading />}
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
