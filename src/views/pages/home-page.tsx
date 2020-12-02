import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../state/store";

const SelectBudgetLabel = styled.h2`
    font-weight: normal;
    margin: 20px 20px;
`;

export const HomePage = () => {
    // const currentUser = useStateValue(state => state.currentUser);
    const activeBudget = useStateValue(state => state.activeBudget);

    if (!activeBudget) {
        return (
            <SelectBudgetLabel>No Budget Selected</SelectBudgetLabel>
        );
    }

    return (
        <h1>{activeBudget.title}</h1>
    );
};
