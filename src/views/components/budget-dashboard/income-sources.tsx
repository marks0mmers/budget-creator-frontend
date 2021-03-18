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
            <div id="income-sources-container">
                {props.incomeSources
                    .sortBy(i => i.name)
                    .valueSeq()
                    .map((incomeSource, id) => (
                        <IncomeSourceView
                            key={id}
                            index={id}
                            budgetId={props.budgetId}
                            incomeSource={incomeSource}
                        />
                    ))}
                {isCreating && 
                    <IncomeSourceForm 
                        budgetId={props.budgetId} 
                        hideForm={handleIncomeSourceSubmit} 
                    />
                }
            </div>
            <TotalRow>
                <span>Total</span>
                <span>${props.incomeSources.reduce((total, i) => total += i.amount, 0).toFixed(2)}</span>
            </TotalRow>
        </Container>
    );
};

const Container = styled.section`
    background: white;
    grid-area: income-sources;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: grid;
    grid-template-rows: auto 1fr auto;

`;

const IncomeSourcesLabel = styled.h3`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto;
    font-weight: normal;
    border-bottom: 1px solid lightgray;
`;

const TotalRow = styled.footer`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr auto 40px;
    grid-column-gap: 5px;
    border-top: 1px solid lightgray;
`;
