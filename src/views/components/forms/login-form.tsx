import { useCallback, useContext } from "react";
import styled from "styled-components";
import { Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { store } from "../../../state/store";
import { Required } from "../shared/required";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { User } from "../../../models/user";
import { SetCurrentUserCreator } from "../../../state/actions";
import { http } from "../../../util/fetch-builder";
import { useLocalStorage } from "../../../util/use-local-storage";
import { Toast } from "../../../util/toast";

interface LoginUserForm {
    username: string;
    password: string;
}

export const LoginForm = () => {
    const { dispatch } = useContext(store);
    const history = useHistory();
    const [, setJwtToken] = useLocalStorage("jwtToken");

    const handleSubmit = useCallback(async (values: LoginUserForm, formikHelpers: FormikHelpers<LoginUserForm>) => {
        try {
            const data = await http<User & {token: string}>("/api/users/login", "POST", values);
            setJwtToken(data.parsedBody?.token);
            const user = new User(data.parsedBody);
            dispatch(SetCurrentUserCreator(user));
            history.push("/");
        } catch(error) {
            Toast.error("Failed to Login");
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }, [dispatch, history, setJwtToken]);

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            validateOnBlur={false}
            validateOnChange={false}
            validationSchema={Yup.object().shape({
                username: Yup
                    .string()
                    .required("Username is required"),
                password: Yup
                    .string()
                    .required("Password is required"),
            })}
            onSubmit={handleSubmit}
        >
            {(formProps: FormikProps<LoginUserForm>) => (
                <Form id="login-form" onSubmit={formProps.handleSubmit}>
                    <LabelInput id="username-label">
                        Username:
                        <Required />
                        <Input
                            type="text"
                            name="username"
                            onChange={formProps.handleChange}
                            onBlur={formProps.handleBlur}
                            value={formProps.values.username}
                        />
                        {formProps.errors.username && <Error>{formProps.errors.username}</Error>}
                    </LabelInput>
                    <LabelInput id="password-label">
                        Password:
                        <Required />
                        <Input
                            type="password"
                            name="password"
                            onChange={formProps.handleChange}
                            onBlur={formProps.handleBlur}
                            value={formProps.values.password}
                        />
                        {formProps.errors.password && <Error>{formProps.errors.password}</Error>}
                    </LabelInput>
                    <Button
                        type="submit"
                        text="Submit"
                        height={40}
                    />
                </Form>
            )}
        </Formik>
    );
};

const Form = styled.form`
    width: 360px;
    margin: 10px 10px 10px 10px;
    background: white;
    padding: 20px;
`;

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;
