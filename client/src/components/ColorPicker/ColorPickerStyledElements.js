import styled, { css } from "styled-components";

export const PickerButton = styled.button(
  (props) => css`
    border-radius: 50%;
    border: none;
    padding: 0.7rem;
    cursor: pointer;
    margin: 0.1rem;
    &.picker-single {
      float: left;
      margin: 55px 5px 0 0;
      padding: 1rem;
      @media ${(props) => props.theme.breakpoints.md} {
          padding: 0.8rem;
          margin-top: 38px;
      }
    }
    &:hover {
      box-shadow: 2px 2px 2px;
    }
    ${(props.color === "green" || !props.color) &&
    css`
      background: #085025;
    `};
    ${props.color === "red" &&
    css`
      background: #e6194b;
    `}
    ${props.color === "orange" &&
    css`
      background: #f58231;
    `}
    ${props.color === "purple" &&
    css`
      background: #911eb4;
    `}
    ${props.color === "black" &&
    css`
      background: #212421;
    `}
    ${props.color === "blue" &&
    css`
      background: #4363d8;
    `}
    ${props.color === "yellow" &&
    css`
      background: #ffe119;
    `}
    ${props.color === "magenta" &&
    css`
      background: #f032e6;
    `}
    ${props.color === "grey" &&
    css`
      background: #a9a9a9;
    `}
  `
);

export const PickerModalBox = styled.div`
  display: none;
  position: absolute;
  padding: 0.5rem;
  background: ${(props) => props.theme.colors.earthBlue};
  transform: translate(-80px, -110px);
  border-radius: 2px 50px / 85px;
  &.picker-modal-single {
      transform: translate(20px, 86px);
  }
  &.showPicker {
    display: block;
  }
`;
