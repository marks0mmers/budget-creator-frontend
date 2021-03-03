import { FormikHelpers, useFormik } from "formik";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { object, string } from "yup";
import { Input, LabelInput, Error, Required } from "../shared/input";
import { Budget, BudgetContract } from "../../../models/budget";
import { useHttp } from "../../../util/fetch-builder";
import { Toast } from "../../../util/toast";
import { Button } from "../shared/button";
import { ActivityLoading } from "../shared/activity-loading";

interface BudgetFormType {
    title: string;
}

interface Props {
    onSubmit: (budget: Budget) => void;
}

export const BudgetForm = ({onSubmit}: Props) => {
    const [createBudgetRequest, isCreateBudgetLoading, createBudgetError] = useHttp<BudgetContract>("/api/budgets", "POST");

    useEffect(() => {
        if (createBudgetError) {
            Toast.error(createBudgetError.message);
        }
    }, [createBudgetError]);

    const handleSubmit = useCallback(async (values: BudgetFormType, formikHelpers: FormikHelpers<BudgetFormType>) => {
        const data = await createBudgetRequest(values);
        onSubmit(new Budget(data));

        formikHelpers.setSubmitting(false);
    }, [onSubmit, createBudgetRequest]);

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
        <>
            {isCreateBudgetLoading && <ActivityLoading />}
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
        </>
    );
};

const Form = styled.form`
    label:last-of-type {
        margin-bottom: 20px;
    }
`;
