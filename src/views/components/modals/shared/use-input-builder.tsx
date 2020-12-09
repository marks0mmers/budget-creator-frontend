import { FormikProps } from "formik";
import React from "react";
import styled from "styled-components";
import { Required } from "../../shared/required";
import { Input } from "../../shared/input";

// eslint-disable-next-line react/display-name
export const useInputBuilder = () => (
    label: string,
    value: string | number,
    formProps: FormikProps<unknown>,
    name: string,
    required: boolean,
    error?: string,
) => (
    <LabelInput>
        {label}
        {required && <Required />}
        <Input
            type="text"
            onChange={formProps.handleChange}
            onBlur={formProps.handleBlur}
            value={value}
            name={name}
        />
        {error && <Error>{error}</Error>}
    </LabelInput>
);

const LabelInput = styled.div`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Error = styled.div`
    color: red;
`;
