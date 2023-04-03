import React, { useContext, useState, useEffect } from "react";
import Logo from "../../images/logo-navbar.png";
import { Data } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { Tooltip } from "@material-ui/core";
import Mic from "../../images/Google_mic.svg.png";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { isValidText } from "../Globals/isValidText";
import NavbarDropDown from "../Globals/NavbarDropDown";
import { Dropdown } from "react-bootstrap";

const SearchPageNavbar = ({
  navbarFixed,
  searchPageActiveComponent,
  specialCharacterAlert,
  searchValueLengthExceedAlert,
}) => {
  const {
    setIsSearch,
    searchValue,
    setSearchValue,
    setIsVoiceSearch,
    setIsAllResponseFound,
    setIsImageResponseFound,
  } = useContext(Data);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === searchValue) {
      return;
    }
    if (input.length > 200) {
      searchValueLengthExceedAlert();
      return;
    }
    if (!isValidText(input)) {
      specialCharacterAlert();
      return;
    }

    setSearchValue(input);
    console.log("I am submitted");
  };
  const [input, setInput] = useState(searchValue);
  useEffect(() => {
    setIsAllResponseFound(false);
    setIsImageResponseFound(false);
    setActiveIndex(searchPageActiveComponent.current);
  }, [searchValue]);
  return (
    <>
      <nav
        className={
          navbarFixed
            ? "search-page-navbar-container fixed"
            : "search-page-navbar-container"
        }
      >
        <div
          className={
            navbarFixed ? "search-page-nav padding-bottom-0" : "search-page-nav"
          }
        >
          <div className="search-page-nav-image-container">
            <Link
              to="/"
              style={{
                display: "grid",
                placeItems: "center",
              }}
            >
              <img
                src={Logo}
                alt="google image"
                onClick={() => {
                  setIsSearch(false);
                  setSearchValue("");
                }}
                className="search-page-logo"
              />
            </Link>
          </div>
          <form
            className="search-page-search-bar-container"
            onSubmit={handleSubmit}
          >
            <div className="search-page-search-bar">
              <input
                type="search"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <Divider
                orientation="vertical"
                flexItem
                className="search-page-search-bar-divider"
              />
              <span className="mic-search-container">
                <Tooltip title="Search by voice" arrow placement="bottom">
                  <img
                    src={Mic}
                    alt=""
                    onClick={() => {
                      setIsVoiceSearch(true);
                    }}
                  />
                </Tooltip>
              </span>
              <button
                className="search-page-search-icon-container"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="search-page-search-icon"
                />
              </button>
            </div>
          </form>
          <div className="space-filler"></div>
          <Tooltip title="Apps" interactive>
            <div className="search-page-apps-icon-container google-apps-icon-container">
              <NavbarDropDown />
            </div>
          </Tooltip>
          <Tooltip title="Google Account" interactive placement="left-end">
            <div className="search-page-user-icon-container user-icon-container">
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="google-apps-icon"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <button className="login-btn">sign in</button>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Tooltip>
          
        </div>
        {navbarFixed ? (
          ""
        ) : (
          <div className="search-page-nav-list-container">
            <div className="space-filler"></div>
            <ul className="search-page-nav-list">
              <div>
                <Link
                  to={`/${searchValue}/all`}
                  style={{
                    height: "100%",
                  }}
                >
                  <li
                    className={activeIndex == 0 ? "active" : ""}
                    onClick={() => {
                      setActiveIndex(0);
                      searchPageActiveComponent.current = 0;
                    }}
                  >
                    <span className="search-page-nav-list-icon">
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <span className="search-page-nav-list-text">All</span>
                  </li>
                </Link>
                <Link
                  to={`/${searchValue}/Images`}
                  style={{
                    height: "100%",
                  }}
                >
                  <li
                    className={activeIndex == 1 ? "active" : ""}
                    onClick={() => {
                      setActiveIndex(1);
                      searchPageActiveComponent.current = 1;
                    }}
                  >
                    <span className="search-page-nav-list-icon">
                      <ImageOutlinedIcon />
                    </span>
                    <span className="search-page-nav-list-text">Images</span>
                  </li>
                </Link>
              </div>
            </ul>
            <div className="space-filler"></div>
            <div className="space-filler"></div>
            <div className="space-filler"></div>
          </div>
        )}
      </nav>
      <Divider
        style={{
          color: " #202124",
          height: "0.2px",
        }}
      />
    </>
  );
};

export default SearchPageNavbar;
