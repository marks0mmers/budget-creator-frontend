import styled from "styled-components";
import { useStateValue } from "../../state/store";
import { HeaderButtons } from "../components/shared/header/header-buttons";
import { HeaderButton } from "../components/shared/header/header-button";
import { useModalState } from "../../util/use-modal-state";
import { Modal } from "../components/modals/shared/modal";
import ModalHeader from "../components/modals/shared/modal-header";
import { useCallback } from "react";
import { BudgetForm } from "../components/forms/budget-form";

const SelectBudgetLabel = styled.h2`
    font-weight: normal;
    margin: 20px 20px;
`;

export const HomePage = () => {
    const [isBudgetModalOpen, openBudgetModal, closeBudgetModal ] = useModalState();
    const activeBudget = useStateValue(state => state.activeBudget);

    const onAddBudgetClick = useCallback(() => {
        openBudgetModal();
    }, [openBudgetModal]);

    if (!activeBudget) {
        return (
            <>
                <HeaderButtons id="buttons-container">
                    <HeaderButton
                        text="Add Budget"
                        icon="add"
                        onClick={onAddBudgetClick}
                    />
                </HeaderButtons>
                <SelectBudgetLabel>No Budget Selected</SelectBudgetLabel>
                <Modal
                    isOpen={isBudgetModalOpen}
                    onClose={closeBudgetModal}
                >
                    <ModalHeader
                        title="Budget Form"
                        exitModal={closeBudgetModal}
                    />
                    <BudgetForm />
                </Modal>
            </>
        );
    }

    return (
        <h1>{activeBudget.title}</h1>
    );
};
