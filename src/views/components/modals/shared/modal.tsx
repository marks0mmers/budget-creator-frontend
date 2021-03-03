import { FC, ReactNode } from "react";
import ReactModal from "react-modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    width?: number;
}

export const Modal: FC<Props> = (props: Props) => (
    <ReactModal
        style={{
            overlay: {
                background: "rgba(0, 0, 0, 0.5)",
            },
            content: {
                height: "fit-content",
                width: `${props.width}px` ?? "40%",
                margin: "100px auto auto auto",
            },
        }}
        appElement={document.getElementById("root") ?? undefined}
        isOpen={props.isOpen}
        onRequestClose={props.onClose}
    >
        {props.children}
    </ReactModal>
);
