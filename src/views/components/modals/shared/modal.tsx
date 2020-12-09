import { FC, ReactNode } from "react";
import ReactModal from "react-modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export const Modal: FC<Props> = (props: Props) => (
    <ReactModal
        style={{
            overlay: {
                background: "rgba(0, 0, 0, 0.5)",
            },
            content: {
                height: "fit-content",
                width: "40%",
                left: "30%",
            },
        }}
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
    >
        {props.children}
    </ReactModal>
);
