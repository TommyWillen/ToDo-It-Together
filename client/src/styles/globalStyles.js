import { createGlobalStyle } from "styled-components";
import backgroundImg from "../assets/todoit-background.jpg"
export const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
}

body {
    background-image: url(${backgroundImg});
}
`