import styled from "styled-components"
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

export const IncompleteButton = styled(ImCheckboxUnchecked)`
color: #a9a9a9;
margin-top: 0.3rem;
`

export const CompleteTodoButton = styled(ImCheckboxChecked)`
color: #085025;
margin-top: 0.3rem;
`