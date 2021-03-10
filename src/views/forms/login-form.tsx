import styled from "styled-components";
import { useFormik } from "formik";
import { object, string } from "yup";
import { Input, LabelInput, Error, Required } from "../components/shared/input";
import { Button } from "../components/shared/button";
import { useMapDispatch } from "../../state/hooks";
import { login } from "../../state/session/session-slice";

interface LoginUserForm {
    username: string;
    password: string;
}

export const LoginForm = () => {
    const dispatch = useMapDispatch({ login });

    const formik = useFormik<LoginUserForm>({
        initialValues: {
            username: "",
            password: "",
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: values => {
            dispatch.login(values);
        },
        validationSchema: object().shape({
            username: string().required("Username is required"),
            password: string().required("Password is required"),
        }),
    });

    return (
        <Form id="login-form" onSubmit={formik.handleSubmit}>
            <LabelInput id="username-label">
                Username
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
                Password
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
