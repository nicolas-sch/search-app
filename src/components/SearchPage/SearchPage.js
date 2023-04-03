import React, { useContext, useEffect, useRef, useState } from "react";
import { Data } from "../../App";
import SearchPageNavbar from "./SearchPageNavbar";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";
import AllResponse from "./AllResponse";
import ImagesResponse from "./ImagesResponse";
import { Modal } from "antd";

const SearchPage = () => {
  const history = useHistory();
  const [navbarFixed, setNavbarFixed] = useState(false);
  const { searchValue } = useContext(Data);
  useEffect(() => {
    console.log("search value os changed");
    switch (searchPageActiveComponent.current) {
      case 0:
        history.push(`/${searchValue}/all`);
        break;
      case 1:
        history.push(`/${searchValue}/Images`);
        break;
      default:
        history.push(`/${searchValue}/all`);
    }
  }, [searchValue]);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setNavbarFixed(true);
    } else {
      setNavbarFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const searchPageActiveComponent = useRef(0);

  const specialCharacterAlert = () => {
    Modal.error({
      title: "Remove special characters from input",
    });
  };

  const searchValueLengthExceedAlert = () => {
    Modal.info({
      title: "Maximum length of keyword allowed is 200",
    });
  };
  
  return (
    <>
      <section className="search-page">
        {/* Search Page Navbar */}
        <SearchPageNavbar
          navbarFixed={navbarFixed}
          searchPageActiveComponent={searchPageActiveComponent}
          specialCharacterAlert={specialCharacterAlert}
          searchValueLengthExceedAlert={searchValueLengthExceedAlert}
        />
        {/* End of Search Pagge Navbar */}

        <Switch>
          <Route path={`/${searchValue}/all`}>
            <AllResponse />
          </Route>
          <Route path={`/${searchValue}/Images`}>
            <ImagesResponse />
          </Route>
          
        </Switch>
      </section>
    </>
  );
};

export default SearchPage;
