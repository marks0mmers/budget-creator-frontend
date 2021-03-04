import { useFormik } from "formik";
import styled from "styled-components";
import { object, string } from "yup";
import { Input, LabelInput, Error, Required } from "../shared/input";
import { Button } from "../shared/button";
import { ActivityLoading } from "../shared/activity-loading";
import { useMapDispatch, useMapState } from "../../../state/hooks";
import { isBudgetLoading } from "../../../state/control/loading/loading-selectors";
import { createBudget } from "../../../state/data/budget/budget-slice";

interface BudgetFormType {
    title: string;
}

interface Props {
    closeModal: () => void;
}

export const BudgetForm = ({closeModal}: Props) => {
    const appState = useMapState(state => ({
        isBudgetLoading: isBudgetLoading(state),
    }));

    const dispatch = useMapDispatch({ createBudget });

    const formik = useFormik<BudgetFormType>({
        initialValues: {
            title: "",
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: values => {
            dispatch.createBudget(values);
            closeModal();
        },
        validationSchema: object().shape({
            title: string().required(),
        }),
    });

    return (
        <>
            {appState.isBudgetLoading && <ActivityLoading />}
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
