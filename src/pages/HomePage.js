import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";
import Logo from "./logo.png";
import CopyrightSection from "../components/CopyrightSection";
import AppsList from "../components/AppsList";
import SearchComponent from "../components/SearchComp";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let appsListOpener = document.getElementById("searchPage__appsListOpener");
    let openerBG = document.getElementById("appsList__openerBox");

    appsListOpener.addEventListener("click", () => {
      openerBG.classList.toggle("appsListIcon__hoverOnClick");
    });
  }, []);

  return (
    <div className="homePage__wrapper">
      <div className="homePage__header">
        <div className="homePage__headerLeft">
          <Link to="./about"> About </Link>
          <Link to="./store"> Store </Link>
        </div>

        <div className="homePage__headerRight">
          <Link to="./gmail"> Gmail </Link>
          <Link to="./images"> Images </Link>
          <div className="appsList__openerBox" id="appsList__openerBox">
            <AppsIcon
              className="appsIcon homePage__appsIcon"
              id="searchPage__appsListOpener"
              onClick={() => setOpen(!open)}
            />
          </div>

          <Avatar className="avatar" />
        </div>
      </div>
      <div
        className="homePage__body"
        onClick={() => {
          let openerBG = document.getElementById("appsList__openerBox");
          setOpen(false);
          openerBG.classList.remove("appsListIcon__hoverOnClick");
        }}
      >
        <img src={Logo} />
        <SearchComponent
          searchInput__classBased__on__Location="homePage__header__searchBar"
          isHomePage__bar
        />
      </div>
      <div>
        {open && (
          <AppsList appsList__container__className="homePage__appsList" />
        )}
      </div>
      <CopyrightSection />
    </div>
  );
};

export default HomePage;
