import styled from "styled-components";
import { store, useStateValue } from "../../state/store";
import { HeaderButtons } from "../components/shared/header/header-buttons";
import { HeaderButton } from "../components/shared/header/header-button";
import { useModalState } from "../../util/use-modal-state";
import { Modal } from "../components/modals/shared/modal";
import ModalHeader from "../components/modals/shared/modal-header";
import { useCallback, useContext, useEffect } from "react";
import { BudgetForm } from "../components/forms/budget-form";
import { SetActiveBudgetCreator } from "../../state/actions";
import { Budget } from "../../models/budget";
import { useHttp } from "../../util/fetch-builder";
import { Toast } from "../../util/toast";
import { ActivityLoading } from "../components/shared/activity-loading";

const SelectBudgetLabel = styled.h2`
    font-weight: normal;
    margin: 20px 20px;
`;

export const HomePage = () => {
    const [isBudgetModalOpen, openBudgetModal, closeBudgetModal ] = useModalState();
    const { dispatch } = useContext(store);
    const activeBudget = useStateValue(state => state.activeBudget);

    const [deleteBudgetRequest, isDeleteBudgetLoading, deleteBudgetError] = useHttp(`/api/budgets/${activeBudget?.id}`, "DELETE");

    useEffect(() => {
        if (deleteBudgetError) {
            Toast.error(deleteBudgetError.message);
        }
    }, [deleteBudgetError]);

    const onDeleteBudgetClick = useCallback(async () => {
        if (window.confirm(`Are you sure you want to delete Budget: ${activeBudget?.title}`)) {
            const deletedId = await deleteBudgetRequest();
            dispatch(SetActiveBudgetCreator(undefined));
        }
    }, [activeBudget, deleteBudgetRequest, dispatch]);

    const onAddBudgetClick = useCallback(() => {
        openBudgetModal();
    }, [openBudgetModal]);

    const handleBudgetFormSubmit = useCallback((budget: Budget) => {
        closeBudgetModal();
        dispatch(SetActiveBudgetCreator(budget));
    }, [dispatch, closeBudgetModal]);

    return (
        <>
            {isDeleteBudgetLoading && <ActivityLoading />}
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

            <SelectBudgetLabel>{activeBudget?.title ?? "No Budget Selected"}</SelectBudgetLabel>

            <Modal
                width={400}
                isOpen={isBudgetModalOpen}
                onClose={closeBudgetModal}
            >
                <ModalHeader
                    title="Budget Form"
                    exitModal={closeBudgetModal}
                />
                <BudgetForm onSubmit={handleBudgetFormSubmit}/>
            </Modal>
        </>
    );
};
