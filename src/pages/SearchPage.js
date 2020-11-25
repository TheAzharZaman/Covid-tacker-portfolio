import React, { useState, useEffect } from "react";
import { useStateValue } from "../files/StateProvider";
import useGoogleSearch from "../files/useGoogleSearch";
import Response from "../files/response";
import AppsList from "../components/AppsList";
import SearchComp from "../components/SearchComp";
import CopyrightSection from "../components/CopyrightSection";
import Logo from "../pages/logo.png";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import {
  Search,
  Image,
  Description,
  Apps,
  Room,
  MoreVert,
} from "@material-ui/icons";

const SearchPage = () => {
  const [{ term }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [show, handleShow] = useState(false);
  const { data } = useGoogleSearch(term); // Real Time API call Response.

  useEffect(() => {
    let appsListOpener = document.getElementById("searchPage__appsListOpener");
    let openerBG = document.getElementById("appsList__openerBox");

    appsListOpener.addEventListener("click", () => {
      openerBG.classList.toggle("appsListIcon__hoverOnClick");
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 55) {
        handleShow(true);
      } else handleShow(false);

      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  // let data = Response; // Default Saved Response.

  console.log(data);

  return (
    <div className="searchPage__wrapper">
      <div
        className={`searchPage__header ${show && "searchPage__headerOnScroll"}`}
      >
        <div className="searchPage__headerTop">
          <Link to="/">
            <img
              className="google__searchPage__logo"
              src={Logo}
              alt="Google_Logo"
            />
          </Link>
          <SearchComp hideButtons isSearchPageBar noNeed__searchIcon />
          <div className="searchPage__headerTop__thirdSec">
            <div className="appsList__openerBox" id="appsList__openerBox">
              <Apps
                className="appsIcon searchBar__appsIcon"
                id="searchPage__appsListOpener"
                onClick={() => setOpen(!open)}
              />
            </div>

            <Avatar className="avatar" />
          </div>
        </div>
        <div
          className={`searchPage__headerLower ${
            show && "disAppear__lowerHeader"
          }`}
          onClick={() => {
            let openerBG = document.getElementById("appsList__openerBox");
            setOpen(false);
            openerBG.classList.remove("appsListIcon__hoverOnClick");
          }}
        >
          <div className="lowerHeader__left">
            <div className="searchPage__headerOption firstOption">
              <Search className="option__Icon" />
              <Link to="#">All</Link>
            </div>
            <div className="searchPage__headerOption">
              <Image className="option__Icon" />
              <Link to="#">Images</Link>
            </div>
            <div className="searchPage__headerOption">
              <Description className="option__Icon" />
              <Link to="#">News</Link>
            </div>
            <div className="searchPage__headerOption">
              <Room className="option__Icon" />
              <Link to="#">Maps</Link>
            </div>
            <div className="searchPage__headerOption">
              <MoreVert className="option__Icon" />
              <Link to="#">More</Link>
            </div>
          </div>
          <div className="lowerHeader__right">
            <Link className="searchPage__headerOption" to="#">
              Settings
            </Link>
            <Link className="searchPage__headerOption" to="#">
              <button className="toolsBtn">Tools</button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="searchPage__body"
        onClick={() => {
          let openerBG = document.getElementById("appsList__openerBox");
          setOpen(false);
          openerBG.classList.remove("appsListIcon__hoverOnClick");
        }}
      >
        {term && (
          <div className="searchPage__results">
            <p className="searchPage__resultsCount">
              About {data?.searchInformation.formattedTotalResults} results (
              {data?.searchInformation.formattedSearchTime} seconds)
            </p>
            {data?.items.map((item) => (
              <div className="searchPage__result">
                <a className="searchResult__link" href={item.link}>
                  {/* <img
                    className="searchResult__imageIcon"
                    src={
                      item.pagemap?.cse_image?.length > 0 &&
                      item.pagemap?.cse_image[0]?.src
                    }
                  /> */}
                  {item.displayLink}
                </a>
                <a href={item.link}>
                  <h2 className="searchResult__title">{item.title}</h2>
                </a>
                <p className="searchResult__description">{item.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        {open && (
          <AppsList appsList__container__className="searchPage__appsList" />
        )}
      </div>
      <CopyrightSection />
    </div>
  );
};

export default SearchPage;
