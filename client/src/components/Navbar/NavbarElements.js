import { FaBars } from "react-icons/fa";
import {AiOutlineHome} from "react-icons/ai"
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";




export const Nav = styled.nav`
  background: #63d471;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  @media (max-width: 768px) {
    overflow  : hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;


export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #000000;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavHome = styled(AiOutlineHome)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavUserImage = styled.img`
    display: none;
@media screen and (max-width: 768px) {
display: block;
    position: absolute;
        top: 25px;
        left: 50%;
        border-radius: 50%;
        width: 2.5rem;
        cursor: pointer;
    }
`

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #000000;
  }
`;

export const NavDropdownMenu = styled.nav`
    background: #63d471;
    border-radius: 8px 0 0 0;
    position: fixed;
    
    right: 0;
    width: 300px;
    /* box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3); */
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    /* transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s; */
    &.active {
        opacity: 1;
        visibility: visible;
        transform: translateY(0px);
        display: block;
        bottom: 85px;

    }
    & ul {
       list-style : none;
       padding: 0;
       margin: 0;
    }
`