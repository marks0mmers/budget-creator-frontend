import { MouseEvent } from "react";
import styled from "styled-components";
import { Icon } from "./icon";

export enum ColorType {
    Primary = "primary",
    Secondary = "secondary",
}

interface ColorTypeMetadata {
    background: string;
    fontColor: string;
    borderColor?: string;
}

const ColorTypes: {[key: string]: ColorTypeMetadata} = {
    [ColorType.Primary]: {
        background: "#BE5342",
        fontColor: "white",
    },
    [ColorType.Secondary]: {
        background: "#42ABBE",
        fontColor: "white",
    },
};

interface Props {
    id?: string;
    text?: string;
    tooltip?: string;
    type?: "button" | "submit" | "reset";
    icon?: string;
    width?: number;
    height?: number;
    marginTopBottom?: number;
    marginLeftRight?: number;
    gridArea?: string;
    colorType?: ColorType;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: Props) => (
    <StyledButton {...props}>
        {props.icon && <Icon iconName={props.icon} margin={5}/>}
        {props.text}
    </StyledButton>
);

const StyledButton = styled.button.attrs((props: Props) => ({
    ...props,
    colorType: props.colorType ?? ColorType.Primary,
}))`
    background: ${props => ColorTypes[props.colorType].background};
    color: ${props => ColorTypes[props.colorType].fontColor};
    height: ${props => props.height ?? 40}px;
    width: ${props => props.width ? `${props.width}px` : "100%"};
    margin: ${props => props.marginTopBottom ?? 0}px ${props => props.marginLeftRight ?? 0}px;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    grid-area: ${props => props.gridArea};
    :hover {
        filter: brightness(115%);
    }
`;
