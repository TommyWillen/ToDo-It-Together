import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  Nav,
  NavbarLink,
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
      {user ? (
        <Link to="/profile">
        <NavUserImage src={user.userImage ? user.userImage : noPhoto} />
      </Link>
      ): null}
      <Bars onClick={handleNavDropDown} />
      <NavDropdownMenu
        ref={dropdownRef}
        className={isActive ? "active" : "inactive"}
      >
        <ul>
          <li>
            <NavbarLink exact to="/">ToDoIt Together</NavbarLink>
          </li>
          <li>
            <NavbarLink to="/about">About The Creator</NavbarLink>
          </li>
          {user ? (
            <>
              <li>
                <NavbarLink to="/profile">{user.username}'s Profile</NavbarLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavbarLink to="/sign-up">Sign Up</NavbarLink>
              </li>
              <li>
                <NavbarLink to="/login">Login</NavbarLink>
              </li>
            </>
          )}
        </ul>
      </NavDropdownMenu>
      <NavMenu>
        <NavbarLink exact to="/">ToDoIt Together</NavbarLink>
        <NavbarLink to="/about">About The Creator</NavbarLink>
        {user ? (
          <>
          <NavbarLink to="/profile">{user.username}'s Profile</NavbarLink>
          </>
        ):(
          <NavbarLink  to="/sign-up">Sign Up</NavbarLink>
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
