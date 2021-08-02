import styled, {css} from "styled-components";


export const PickerButton = styled.button(
    (props) => css`
    border-radius: 50%;
    border: none;
    padding: 0.7rem;
    cursor: pointer;
    margin: 0.1rem;
    &:hover {
        box-shadow: 2px 2px 2px;
    }
    ${(props.color === "green" || !props.color) &&
    css`
    background: #085025;
    `};
    ${props.color === "red" &&
    css`
    background: #E6194B
    `}
    ${props.color === "orange" &&
    css`
    background: #F58231
    `}
    ${props.color === "purple" &&
    css`
    background: #911EB4
    `}
    ${props.color === "black" &&
    css`
    background: #212421
    `}
    ${props.color === "blue" &&
    css`
    background: #4363D8
    `}
    ${props.color === "yellow" &&
    css`
    background: #FFE119
    `}
    ${props.color === "magenta" &&
    css`
    background: #F032E6
    `}
    ${props.color === "grey" &&
    css`
    background: #a9a9a9
    `}
    `
)

export const PickerModalBox = styled.div`
    display: none;
    position: absolute;
    padding: .5rem;
    background: ${props => props.theme.colors.earthBlue};
    transform: translate(-80px, -110px);
    border-radius: 2px 50px / 85px;
    &.showPicker {
        display: block;
    }
`;
