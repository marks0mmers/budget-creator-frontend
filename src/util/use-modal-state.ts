import { useState } from "react";

export const useModalState = <T>(initialState?: T): [boolean, (state?: T) => void, () => void, T | undefined] => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalState, setInternalState] = useState(initialState);

    const openModal = (state?: T) => {
        setIsOpen(true);
        setInternalState(state);
    };

    const closeModal = () => {
        setIsOpen(false);
        setInternalState(undefined);
    };

    return [isOpen, openModal, closeModal, internalState];
};
