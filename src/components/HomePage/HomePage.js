import React from "react";
import HomePageHero from "./HomePageHero";
import { Modal } from "antd";
import Navbar from "./NavBar";

const HomePage = () => {
  const searchValueLengthExceedAlert = () => {
    Modal.info({
      title: "Maximum 200 characters are allowed",
    });
  };
  return (
    <>
      <div className="home-section">
        <Navbar />
        <HomePageHero
          searchValueLengthExceedAlert={searchValueLengthExceedAlert}
        />
      </div>
    </>
  );
};

export default HomePage;
