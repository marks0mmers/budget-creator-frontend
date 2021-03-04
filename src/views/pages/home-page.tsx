import styled from "styled-components";
import { HeaderButtons } from "../components/shared/header/header-buttons";
import { HeaderButton } from "../components/shared/header/header-button";
import { useModalState } from "../../util/use-modal-state";
import { Modal } from "../components/modals/modal";
import ModalHeader from "../components/modals/modal-header";
import { useCallback } from "react";
import { BudgetForm } from "../components/forms/budget-form";
import { ActivityLoading } from "../components/shared/activity-loading";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { getActiveBudget } from "../../state/control/budget/budget-selectors";
import { DeleteBudgetCreator } from "../../state/data/budget/budget-actions";
import { isBudgetLoading } from "../../state/control/loading/selectors";

const SelectBudgetLabel = styled.h2`
    font-weight: normal;
    margin: 20px 20px;
`;

export const HomePage = () => {
    const [isBudgetModalOpen, openBudgetModal, closeBudgetModal ] = useModalState();
    
    const appState = useMapState(state => ({
        activeBudget: getActiveBudget(state),
        isBudgetLoading: isBudgetLoading(state),
    }));

    const dispatch = useMapDispatch({
        deleteBudget: DeleteBudgetCreator,
    });

    const onDeleteBudgetClick = useCallback(async () => {
        if (window.confirm(`Are you sure you want to delete Budget: ${appState.activeBudget?.title}`) && appState.activeBudget?.id) {
            dispatch.deleteBudget(appState.activeBudget.id);
        }
    }, [appState.activeBudget, dispatch]);

    const onAddBudgetClick = useCallback(() => {
        openBudgetModal();
    }, [openBudgetModal]);

    return (
        <>
            {appState.isBudgetLoading && <ActivityLoading />}
            <HeaderButtons id="buttons-container">
                <HeaderButton
                    text="Add Budget"
                    icon="add"
                    onClick={onAddBudgetClick}
                />
                <HeaderButton
                    text="Delete Budget"
                    icon="delete"
                    onClick={onDeleteBudgetClick}
                />
            </HeaderButtons>

            <SelectBudgetLabel>{appState.activeBudget?.title ?? "No Budget Selected"}</SelectBudgetLabel>

            <Modal
                width={400}
                isOpen={isBudgetModalOpen}
                onClose={closeBudgetModal}
            >
                <ModalHeader
                    title="Budget Form"
                    exitModal={closeBudgetModal}
                />
                <BudgetForm closeModal={closeBudgetModal}/>
            </Modal>
        </>
    );
};
