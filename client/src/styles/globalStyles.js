import { createGlobalStyle } from "styled-components";
import backgroundImg from "../assets/todoit-background.jpg"
export const GlobalStyles = createGlobalStyle`
* {
    
}

body {
    margin: 0;
    padding: 0;
    background-image: url(${backgroundImg});
}
`