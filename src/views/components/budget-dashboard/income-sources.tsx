import { Map } from "immutable";
import styled from "styled-components";
import { IncomeSource } from "../../../models/income-source";
import { useTogglableState } from "../../../util/use-togglable-state";
import { IncomeSourceForm } from "../../forms/income-source-form";
import { CircleButton } from "../shared/circle-button";
import { IncomeSourceView } from "./income-source-view";

interface Props {
    budgetId: string;
    incomeSources: Map<string, IncomeSource>;
}

export const IncomeSources = (props: Props) => {
    const [
        isCreating,
        handleCreateClick,
        handleIncomeSourceSubmit,
    ] = useTogglableState();
    const [
        isMouseInIncomeSourceLabel,
        mouseEnteredIncomeSourceLabel,
        mouseExitedIncomeSourceLabel,
    ] = useTogglableState();

    return (
        <Container id="income-sources">
            <IncomeSourcesLabel
                onMouseEnter={mouseEnteredIncomeSourceLabel}
                onMouseLeave={mouseExitedIncomeSourceLabel}
            >
                Income Sources
                <CircleButton
                    icon="add"
                    visible={isMouseInIncomeSourceLabel}
                    onClick={handleCreateClick}
                />
            </IncomeSourcesLabel>
            {props.incomeSources.valueSeq().map((incomeSource, id) => (
                <IncomeSourceView incomeSource={incomeSource} key={id}/>
            ))}
            {isCreating && 
                <IncomeSourceForm 
                    budgetId={props.budgetId} 
                    hideForm={handleIncomeSourceSubmit} 
                />
            }
        </Container>
    );
};

const Container = styled.section`
    background: white;
    grid-area: income-sources;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`;

const IncomeSourcesLabel = styled.h3`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    font-weight: normal;
    border-bottom: 1px solid lightgray;
`;
