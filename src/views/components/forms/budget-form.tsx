import { FormikHelpers, useFormik } from "formik";
import { useCallback } from "react";
import styled from "styled-components";
import { object, string } from "yup";
import { Input, LabelInput, Error } from "../shared/input";
import { BudgetContract } from "../../../models/budget";
import { http } from "../../../util/fetch-builder";
import { Toast } from "../../../util/toast";
import { Required } from "../shared/required";
import { Button } from "../shared/button";

interface BudgetFormType {
    title: string;
}

// interface Props {
//     onSubmit: (budget: Budget) => void;
// }

export const BudgetForm = () => {
    const handleSubmit = useCallback(async (values: BudgetFormType, formikHelpers: FormikHelpers<BudgetFormType>) => {
        try {
            await http<BudgetContract>("/api/budgets", "POST", values);
            // onSubmit(new Budget(data.parsedBody));
        } catch(error) {
            Toast.error("Failed to Submit Budget");
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }, []);

    const formik = useFormik<BudgetFormType>({
        initialValues: {
            title: "",
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: handleSubmit,
        validationSchema: object().shape({
            title: string().required(),
        }),
    });

    return (
        <Form id="budget-form" onSubmit={formik.handleSubmit}>
            <LabelInput id="title=label">
                Title:
                <Required />
                <Input
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.errors.title && <Error>{formik.errors.title}</Error>}
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
    padding: 20px;
`;
