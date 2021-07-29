import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "..";

const MockNavBar = () => {
   return (
   <BrowserRouter>
        <Navbar />
    </BrowserRouter>)
}

