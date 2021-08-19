import styled from "styled-components";
import { AiFillStepForward } from "react-icons/ai";

export const MainAside = styled.aside`
  background: rgb(101, 157, 189, 0.9);
  height: 100vh;
  display: flex;
  padding: 1rem;
  @media ${(props) => props.theme.breakpoints.md} {
    display: none;
  }
`;

export const MainBox = styled.main`
  background: rgb(245, 245, 220, 0.9);
  height: 100vh;
  width: 100%;
  margin-left: ${(props) => (props.leftGap ? props.leftGap : "-2rem")};
  padding: 2rem 3rem;
  @media ${(props) => props.theme.breakpoints.md} {
    margin-left: 0;
    margin-right: 0ch;
    width: 100%;
  }
`;

export const AsideBtn = styled(AiFillStepForward)`
  display: none;
  color: #659dbd;
  bottom: 140px;
  @media ${(props) => props.theme.breakpoints.md} {
    display: block;
    position: absolute;
    font-size: 1.8rem;
    cursor: pointer;
    /* top: 110px; */
  }
  @media only screen and (min-width: 767) {
    top: 110px;
  }
  @media ${(props) => props.theme.breakpoints.sm} {
    /* top: 0; */
    left: 0px;
    bottom: 1.5rem;
    /* transform: translate(-150%, 75%); */
  }
  &.shiftButton {
    transform: rotate(180deg);
    left: 196px;
  }
`;

export const MainAsideShiftMenu = styled.aside`
    visibility: hidden;
    position: fixed;
    background: rgb(101, 157, 189);
    opacity: 0;
    padding: 1.5rem;
    border-top-right-radius: 8px;
    bottom: 0;
    @media ${(props) => props.theme.breakpoints.sm} {
    bottom: 90px;
  }
    &.showAside {
        opacity: 1;
        visibility: visible;
        display: block;
    }
`
