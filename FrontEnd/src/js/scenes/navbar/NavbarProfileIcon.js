import React from "react";
import "./Navbar.scss";

const NavbarProfileIcon = ({ loggedInUserName, onClick }) => {
  const firstChar = loggedInUserName.charAt(0).toUpperCase();

  return (
    <div className="user-profile-icon" onClick={onClick}>
      <div className="user-circle">{firstChar}</div>
    </div>
  );
};

export default NavbarProfileIcon;
