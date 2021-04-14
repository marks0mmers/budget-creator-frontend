import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface Props {
    id: string;
    children?: ReactNode;
}

export const HeaderButtons = ({ children}: Props) => {
    return createPortal(
        children,
        document.getElementById("buttons-container") ?? document.createElement("div"),
    );
};
