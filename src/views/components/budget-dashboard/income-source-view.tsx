import { useCallback } from "react";
import styled from "styled-components";
import { IncomeSource } from "../../../models/income-source";
import { deleteIncomeSource } from "../../../state/data/income-source/income-source-slice";
import { useMapDispatch } from "../../../state/hooks";
import { useTogglableState } from "../../../util/use-togglable-state";
import { IncomeSourceForm } from "../../forms/income-source-form";
import { CircleButton } from "../shared/circle-button";

interface Props {
    index: number;
    budgetId: string;
    incomeSource: IncomeSource;
}

export const IncomeSourceView = (props: Props) => {
    const dispatch = useMapDispatch({deleteIncomeSource});

    const [
        isEditing,
        handleEditClick,
        handleEditSourceSubmit,
    ] = useTogglableState();
    const [
        isMouseInIncomeSource,
        mouseEnteredIncomeSource,
        mouseExitedIncomeSource,
    ] = useTogglableState();

    const handleDeleteClick = useCallback(() => {
        dispatch.deleteIncomeSource({
            budgetId: props.budgetId,
            incomeSourceId: props.incomeSource.id,
        });
    }, [props.budgetId, props.incomeSource, dispatch]);

    return !isEditing ? (
        <Container 
            id={`income-source-${props.incomeSource.id}`}
            index={props.index}
            onMouseEnter={mouseEnteredIncomeSource}
            onMouseLeave={mouseExitedIncomeSource}
        >
            <span>{props.incomeSource.name}</span>
            <span>${props.incomeSource.amount.toFixed(2)}</span>
            <CircleButton
                icon="edit"
                visible={isMouseInIncomeSource}
                onClick={handleEditClick}
            />
            <CircleButton
                icon="delete"
                visible={isMouseInIncomeSource}
                onClick={handleDeleteClick}
            />
        </Container>
    ) : (
        <IncomeSourceForm
            budgetId={props.budgetId}
            hideForm={handleEditSourceSubmit}
            incomeSourceId={props.incomeSource.id}
            initialValues={{
                name: props.incomeSource.name,
                amount: props.incomeSource.amount,
            }}
        />
    );
};

const Container = styled.div<{index: number}>`
    background: ${props => props.index % 2 === 1 ? "rgb(245 245 245)" : "white"};
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto 20px 20px;
    grid-column-gap: 5px;

    :hover {
        background: rgb(240 240 240);
    }
`;
