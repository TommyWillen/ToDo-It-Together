import styled from "styled-components";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

export const IncompleteButton = styled(ImCheckboxUnchecked)`
  color: #a9a9a9;
  margin-top: 0.3rem;
  &:hover {
    box-shadow: 2px 2px 2px;
  }
  &.float-complete {
    float: right;
    margin: 50px 10px 0 0;
    font-size: 1.5rem;
    @media ${(props) => props.theme.breakpoints.md} {
      font-size: 1.2rem;
    }
  }
`;

export const CompleteTodoButton = styled(ImCheckboxChecked)`
  color: #085025;
  margin-top: 0.3rem;
  &:hover {
    box-shadow: 2px 2px 2px;
  }
  &.float-complete {
    float: right;
    margin: 50px 10px 0 0;
    font-size: 1.5rem;
    @media ${(props) => props.theme.breakpoints.md} {
      font-size: 1.2rem;
    }
  }
`;
