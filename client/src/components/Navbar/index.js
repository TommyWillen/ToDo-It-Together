import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavDropdownMenu,
  NavHome,
  NavUserImage
} from "./NavbarElements";
import noPhoto from "../../assets/blank-profile-picture.png"

const Navbar = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const handleNavDropDown = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <Nav>
        <Link to="/">
        <NavHome/> 
        </Link>
        <Link to="/profile">
        <NavUserImage src={noPhoto} />
        </Link>
      <Bars onClick={handleNavDropDown} />
      <NavDropdownMenu
        ref={dropdownRef}
        className={isActive ? "active" : "inactive"}
      >
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About ToDoIt Together</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Your Profile</NavLink>
          </li>
          <li>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </NavDropdownMenu>
      <NavMenu>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About ToDoIt Together</NavLink>
        <NavLink to="/profile">Your Profile</NavLink>
        <NavLink to="/sign-up">Sign Up</NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/login">Login</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
