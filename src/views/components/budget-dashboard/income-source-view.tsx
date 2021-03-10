import { ReactText } from "react";
import styled from "styled-components";
import { IncomeSource } from "../../../models/income-source";

interface Props {
    key: ReactText;
    incomeSource: IncomeSource;
}

export const IncomeSourceView = (props: Props) => {
    return (
        <Container 
            id={`income-source-${props.incomeSource.id}`}
            key={props.key}
        >
            <span>{props.incomeSource.name}</span>
            <span>${props.incomeSource.amount.toFixed(2)}</span>
        </Container>
    );
};

const Container = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    
    :hover {
        background: rgb(245 245 245);
    }
`;
