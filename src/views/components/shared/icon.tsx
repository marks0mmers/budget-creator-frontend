import styled from "styled-components";

interface Props {
    iconName: string;
    size?: number;
    margin?: number;
    color?: string;
}

export const Icon = (props: Props) => (
    <StyledIcon id="icon" className="material-icons" {...props}>{props.iconName}</StyledIcon>
);

const StyledIcon = styled.i<Partial<Props>>`
    margin: auto ${props => props.margin ? `${props.margin}px` : "auto"};
    font-size: ${props => props.size ?? 20}px;
    color: ${props => props.color ?? "black"};
`;
