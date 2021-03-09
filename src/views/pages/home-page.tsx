import { HeaderButtons } from "../components/shared/header/header-buttons";
import { HeaderButton } from "../components/shared/header/header-button";
import { useModalState } from "../../util/use-modal-state";
import { Modal } from "../modals/modal";
import ModalHeader from "../modals/modal-header";
import { useCallback } from "react";
import { BudgetForm } from "../forms/budget-form";
import { ActivityLoading } from "../components/shared/activity-loading";
import { useMapDispatch, useMapState } from "../../state/hooks";
import { getActiveBudget } from "../../state/control/budget/budget-selectors";
import { isBudgetLoading } from "../../state/control/loading/loading-selectors";
import { deleteBudget } from "../../state/data/budget/budget-slice";
import { BudgetDashboard } from "../components/budget-dashboard/budget-dashboard";

export const HomePage = () => {
    const [isBudgetModalOpen, openBudgetModal, closeBudgetModal ] = useModalState();
    
    const appState = useMapState(state => ({
        activeBudget: getActiveBudget(state),
        isBudgetLoading: isBudgetLoading(state),
    }));

    const dispatch = useMapDispatch({
        deleteBudget,
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

            <BudgetDashboard />

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
