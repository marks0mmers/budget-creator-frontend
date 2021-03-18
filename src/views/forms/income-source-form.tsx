import { useFormik } from "formik";
import { useEffect } from "react";
import styled from "styled-components";
import { number, object, string } from "yup";
import { createIncomeSource, updateIncomeSource } from "../../state/data/income-source/income-source-slice";
import { useMapDispatch } from "../../state/hooks";
import { Toast } from "../../util/toast";
import { Button } from "../components/shared/button";
import { CircleButton } from "../components/shared/circle-button";
import { Input, LabelInput, Required } from "../components/shared/input";

interface IncomeSourceFormShape {
    name: string;
    amount: number;
}

interface Props {
    budgetId: string;
    hideForm: () => void;
    incomeSourceId?: string;
    initialValues?: IncomeSourceFormShape;
}

export const IncomeSourceForm = (props: Props) => {
    const dispatch = useMapDispatch({ createIncomeSource, updateIncomeSource });

    const formik = useFormik<IncomeSourceFormShape>({
        initialValues: props.initialValues ?? {
            name: "",
            amount: 0,
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: values => {
            if (props.incomeSourceId) {
                dispatch.updateIncomeSource({
                    budgetId: props.budgetId,
                    incomeSourceId: props.incomeSourceId,
                    contract: values,
                });
            } else {
                dispatch.createIncomeSource({
                    budgetId: props.budgetId,
                    contract: values,
                });
            }
            props.hideForm();
        },
        validationSchema: object().shape({
            name: string()
                .required("Name of Income Source is Required"),
            amount: number()
                .positive("Income Amount must be positive")
                .required("Income Amount is required"),
        }),
    });

    useEffect(() => {
        if (formik.errors.name) {
            Toast.warn(formik.errors.name);
        }
        if (formik.errors.amount) {
            Toast.warn(formik.errors.amount);
        }
    }, [formik.errors]);

    return (
        <Form id="income-source-form" onSubmit={formik.handleSubmit}>
            <CircleButton
                visible
                marginTopBottom={10}
                icon="clear"
                type="button"
                onClick={props.hideForm}
            />
            <LabelInput id="name-label">
                Name
                <Required />
                <Input
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
            </LabelInput>
            <LabelInput id="amount-label">
                Amount
                <Required />
                <Input
                    name="amount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                />
            </LabelInput>
            <Button
                type="submit"
                icon="save"
                height={40}
            />
        </Form>
    );
};

const Form = styled.form`
    padding: 5px;
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: auto 3fr 1fr 40px;
`;
