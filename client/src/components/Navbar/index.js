import { useContext, useEffect, useRef, useState } from "react";
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
  NavUserImage,
} from "./NavbarElements";
import noPhoto from "../../assets/blank-profile-picture.png";
import { AuthContext } from "../../context/auth";

const Navbar = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { user, logout } = useContext(AuthContext);
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
        <NavHome data-testid="homeButton" />
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
            <NavLink to="/">ToDoIt Together</NavLink>
          </li>
          <li>
            <NavLink to="/about">About The Creator</NavLink>
          </li>
          {user ? (
            <>
              <li>
                <NavLink to="/profile">{user.username}'s Profile</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </NavDropdownMenu>
      <NavMenu>
        <NavLink to="/">ToDoIt Together</NavLink>
        <NavLink to="/about">About The Creator</NavLink>
        {user ? (
          <>
          <NavLink to="/profile">{user.username}'s Profile</NavLink>
          </>
        ):(
          <NavLink to="/sign-up">Sign Up</NavLink>
        )}
      </NavMenu>
      <NavBtn>
        {user ? (
          <NavBtnLink name="logout" onClick={logout} to="/">Logout</NavBtnLink>
        ): (
          <NavBtnLink to="/login">Login</NavBtnLink>
        )}
        
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
