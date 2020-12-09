import styled from "styled-components";
import { Icon } from "../icon";
import { MouseEvent } from "react";

interface Props {
    id?: string;
    text: string;
    icon: string;
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export const HeaderButton = (props: Props) => (
    <StyledButton {...props}>
        <Icon iconName={props.icon} margin={5} />
        {props.text}
    </StyledButton>
);

const StyledButton = styled.button<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;    
    background: rgba(0, 0, 0, 0);
    color: white;
    height: 40px;
    min-width: 40px;
    margin-left: 10px;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 10px;

    :hover {
        background: rgba(255, 255, 255, 0.1);
    }

    :active {
        background: rgba(255, 255, 255, 0.2);
    }

    :focus {
        outline: 0;
    }
`;
