import { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { Icon } from "./icon";

interface Props {
    id?: string;
    tooltip?: string;
    type?: "button" | "submit" | "reset";
    icon: string;
    width?: number;
    height?: number;
    marginTopBottom?: number;
    marginLeftRight?: number;
    gridArea?: string;
    visible?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const CircleButton = (props: Props) => (
    <StyledButton {...props}>
        <Icon iconName={props.icon} size={16} color="white"/>
    </StyledButton>
);

const StyledButton = styled.button.attrs((props: Props) => ({
    ...props,
}))`
  background: grey;
  width: 20px;
  height: 20px;
  margin: ${props => props.marginTopBottom ?? 0}px ${props => props.marginLeftRight ?? 0}px;
  border: none;
  outline: none;
  font-family: 'Roboto', sans-serif;
  padding: 2px 2px;
  font-weight: 500;
  border-radius: 10px;
  grid-area: ${props => props.gridArea};

  :hover {
    filter: brightness(115%);
  }

  :active {
    filter: brightness(85%);
  }

  ${props => props.visible ? css`
    opacity: 1;
    transition: opacity 0.2s;
  ` : ""}

  ${props => !props.visible ? css`
    opacity: 0;
    transition: opacity 0.2s 0.2s;
  ` : ""}
`;
