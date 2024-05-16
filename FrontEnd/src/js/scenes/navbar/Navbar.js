import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NAVBAR_CONFIG } from "./navbar-config";
import "./Navbar.scss";
import NavbarProfileIcon from "./NavbarProfileIcon";
import { useSelector } from "react-redux";
import {
  isLoggedInSelector,
  registeredUserDtlsSelector,
} from "../../redux/selectors/userDtlsSelectors";

const Navbar = ({ setCurrentTab, currentTab }) => {
  const windowWidth = window.innerWidth;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarConfig, setNavbarConfig] = useState(NAVBAR_CONFIG);
  const [showDropdown, setShowDropdown] = useState(false);

  const isLoggedIn = useSelector(isLoggedInSelector);
  const loggedInUserName = useSelector(registeredUserDtlsSelector);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDropdownOpen(false);
      if (window.innerWidth > 499) {
        setToggleMenu(false);
      } else if (window.innerWidth < 499) {
        setToggleMenu(true);
      }
    });
  }, [windowWidth]);

  useEffect(() => {
    if (isLoggedIn) {
      let arr = [];
      NAVBAR_CONFIG.forEach((each) => {
        if (["Login", "Sign Up"].includes(each.disp)) {
          each["show"] = false;
        }
        if (each.disp === "Profile") {
          each["show"] = true;
        }
        arr.push(each);
      });
      setNavbarConfig(arr);
    }
  }, [isLoggedIn]);

  const navbarItems = (filteredItems) => {
    return filteredItems.map((each) => {
      return (
        <li
          onClick={() => {
            setCurrentTab(each.url);
            setDropdownOpen(false);
            setToggleMenu(false);
          }}
        >
          <div>{each.icon}</div>
          <Link
            className={currentTab === each.url ? "selected-tab" : ""}
            to={each.url}
          >
            {each.disp}
          </Link>
        </li>
      );
    });
  };
  const createSideNav = (filteredItems) => {
    return (
      <>
        <div
          className={
            dropdownOpen && window.innerWidth > 699
              ? "showToggleMenu side-nav"
              : "hideToggleMenu side-nav"
          }
        >
          {navbarItems(filteredItems)}
        </div>
        {dropdownOpen && window.innerWidth > 699 ? (
          <div
            style={{
              background: "transparent",
              width: "100vw",
              height: "100vh",
              position: "absolute",
              top: "0px",
              zIndex: "9",
            }}
            onClick={() => {
              setDropdownOpen(false);
              setToggleMenu(false);
            }}
          ></div>
        ) : null}
      </>
    );
  };

  const handleLogout = () => {
    // Your logout logic here
    // setIsLoggedIn(false);
    // Close the dropdown after logout
    setShowDropdown(false);
  };

  const filteredItems = navbarConfig.filter((each) => each.show);
  return (
    <nav className="navbar">
      {toggleMenu ? (
        <ul>{navbarItems(filteredItems)}</ul>
      ) : (
        <div className="navbar-header">
          <div className="navbar-name" onClick={setCurrentTab("")}>
            <span>
              <Link to={"/"}>Bengali Copilot</Link>
            </span>
          </div>
          {isLoggedIn && (
            <>
              <NavbarProfileIcon
                onClick={() => setShowDropdown(!showDropdown)}
                loggedInUserName={loggedInUserName["name"]}
              />
              {showDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <div onClick={handleLogout}>Logout</div>
                  </li>
                </ul>
              )}
            </>
          )}
          <div
            className="navbar-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {dropdownOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
          </div>
        </div>
      )}
      {createSideNav(filteredItems)}
    </nav>
  );
};

export default Navbar;
