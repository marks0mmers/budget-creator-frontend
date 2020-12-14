import { useCallback, useContext } from "react";
import styled from "styled-components";
import { FormikHelpers, useFormik } from "formik";
import { object, string } from "yup";
import { useHistory } from "react-router-dom";
import { store } from "../../../state/store";
import { Required } from "../shared/required";
import { Input, LabelInput, Error } from "../shared/input";
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
    );
};

const Form = styled.form`
    width: 360px;
    margin: 10px 10px 10px 10px;
    background: white;
    padding: 20px;
`;
