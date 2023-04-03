import React, { useContext, useState, useEffect } from "react";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Data } from "../../App";
import Alert from "@material-ui/lab/Alert";
import { isValidText } from "../Globals/isValidText";

const HomePageHero = ({ searchValueLengthExceedAlert }) => {
  const [input, setInput] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const { searchValue, setSearchValue, setDoSearch } =
  useContext(Data);

  useEffect(() => {
    if (searchValue === "") {
    } else {
      setDoSearch(true);
    }
  }, [searchValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    if (input.length > 200) {
      searchValueLengthExceedAlert();
      return;
    }
    if (!isValidText(input)) {
      setIsAlert(true);
      return;
    }
    setSearchValue(input);
  };
  
  return (
    <>
      {isAlert ? (
        <div className="home-page-alert-container">
          <Alert
            severity="error"
            onClose={() => {
              setIsAlert(false);
            }}
            className="home-page-alert"
          >
            Please remove special characters from input!
          </Alert>
        </div>
      ) : (
        ""
      )}

      <section className="home-page-hero-section">
        <div className="home-page-hero-section-center">
          <article className="home-logo-img-container">
            <img src={Logo} alt="Google image" />
          </article>
          <form className="home-search-bar-container" onSubmit={handleSubmit}>
            <div className="home-search-bar">
              <FontAwesomeIcon icon={faSearch} className="home-search-icon" />
              <input
                type="text"
                className="home-input"
                placeholder="search"
                data-testid="searchBar"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <div className="home-btn-container">
              <button className="home-btn" onClick={handleSubmit} data-testid="button">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default HomePageHero;
