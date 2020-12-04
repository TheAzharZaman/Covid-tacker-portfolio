import React from "react";
import TrackerLogo from "../tracker_logo.png";
import WorldwideIcon from "../worldwideIcon.png";
import { FormControl, Select, MenuItem, Card, Avatar } from "@material-ui/core";
import InfoBox from "../Components/InfoBox";
import Map from "../Components/Map";
import Table from "../Components/Table";
import LineGraph from "../Components/LineGraph";
import { Link } from "react-router-dom";
import { db } from "../Files/firebase";

import {
  sortData,
  NormalFiguresToCommas,
  prettyPrintStat,
  prettyPrintStatPlus,
} from "../Files/utilities";
import { useStateValue } from "../Files/StateProvider";
import { actionTypes } from "../Files/reducer";

const Homepage = () => {
  let [{ user }, dispatch] = useStateValue();

  const [countryNames, setCountryNames] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("worldwide");
  const [countryInfo, setCountryInfo] = React.useState({});
  const [tableListData, setTableListData] = React.useState([]);
  const [mapCountries, setMapCountries] = React.useState([]);
  const [mapDisplayDataType, setMapDisplayDataType] = React.useState("cases");
  const [graphDataType, setGraphDataType] = React.useState("cases");
  const [mapCenter, setMapCenter] = React.useState({
    lat: "41.3999",
    lng: "-4.2245",
  });

  const [mapZoom, setMapZoom] = React.useState(2.5);

  const [graphDuration, setGraphDuration] = React.useState("150");
  let [userDisplayName, setUserDisplayName] = React.useState("");

  // React.useEffect(() => {
  //   db.collection("usersData").onSnapshot((snapshot) => {
  //     // setUserDisplayName(snapshot.docs.userDisplayName);
  //     console.log(snapshot.userEmail);
  //   });
  // });

  React.useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  React.useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            code: country.countryInfo.iso2,
            flagSrc: country.countryInfo.flag,
          }));

          const sortedData = sortData(data);
          setTableListData(sortedData);
          setCountryNames(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (selectedCountryFromList) => {
    const COUNTRY_CODE = selectedCountryFromList.target.value;
    setSelectedCountry(COUNTRY_CODE);

    let API_URL =
      COUNTRY_CODE === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${COUNTRY_CODE}`;

    await fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  React.useEffect(() => {
    let GraphsDataSwitcher = () => {
      let CasesSwitch = document.getElementById("graphSwitcher__cases");

      CasesSwitch.addEventListener("click", () => {
        CasesSwitch.classList.add("activeButton");
        RecoveredSwitch.classList.remove("activeButton");
        DeathsSwitch.classList.remove("activeButton");
        setGraphDataType("cases");
      });

      let RecoveredSwitch = document.getElementById("graphSwitcher__recovered");

      RecoveredSwitch.addEventListener("click", () => {
        CasesSwitch.classList.remove("activeButton");
        RecoveredSwitch.classList.add("activeButton");
        DeathsSwitch.classList.remove("activeButton");
        setGraphDataType("recovered");
      });

      let DeathsSwitch = document.getElementById("graphSwitcher__deaths");
      DeathsSwitch.addEventListener("click", () => {
        CasesSwitch.classList.remove("activeButton");
        RecoveredSwitch.classList.remove("activeButton");
        DeathsSwitch.classList.add("activeButton");
        setGraphDataType("deaths");
      });
    };

    GraphsDataSwitcher();
  }, []);

  const onLogout = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };

  return (
    <div className="app flexColumn">
      <div className="appTop flexRow">
        <div className="app__left">
          {/* Header Section */}

          <div className="app__header flexRow between center">
            <img
              className="logo pointer"
              src={TrackerLogo}
              alt="COVID-19 TRACKER"
            />

            <div className="flexRow evenly center">
              <Link
                className="header__loginText"
                onClick={onLogout}
                to="/auth/login"
              >
                {user ? "Logout" : "LogIn"}
              </Link>
              {user?.photoURL ? (
                <div className="account flexRow evenly center">
                  <h3>{user.displayName}</h3>
                  <Avatar className="pointer" src={user.photoURL} />
                </div>
              ) : null}

              {!user ? (
                <h3 className="guestText">
                  {userDisplayName === "" ? "Hello Guest" : userDisplayName}
                </h3>
              ) : null}

              <FormControl className="header__dropdown">
                <Select
                  className="header__dropdownBox"
                  variant="outlined"
                  value={selectedCountry}
                  onChange={onCountryChange}
                >
                  <MenuItem className="listItem" value="worldwide">
                    <img className="dropdown__flagGlobal" src={WorldwideIcon} />
                    Worldwide
                  </MenuItem>
                  {countryNames.map((countryName) => (
                    <MenuItem className="listItem" value={countryName.code}>
                      <img
                        className="dropdown__flag"
                        src={countryName.flagSrc}
                      />
                      {countryName.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* App stats Section */}

          <div className="app__stats flexRow between center">
            <InfoBox
              onClick={(e) => {
                setMapDisplayDataType("cases");
              }}
              active={mapDisplayDataType === "cases"}
              title="Cases"
              plus={prettyPrintStatPlus(countryInfo.todayCases)}
              total={NormalFiguresToCommas(countryInfo.cases)}
            />

            <InfoBox
              onClick={(e) => {
                setMapDisplayDataType("recovered");
              }}
              active={mapDisplayDataType === "recovered"}
              title="Recovered"
              plus={prettyPrintStatPlus(countryInfo.todayRecovered)}
              total={NormalFiguresToCommas(countryInfo.recovered)}
            />

            <InfoBox
              onClick={(e) => {
                setMapDisplayDataType("deaths");
              }}
              active={mapDisplayDataType === "deaths"}
              title="Deaths"
              plus={prettyPrintStatPlus(countryInfo.todayDeaths)}
              total={NormalFiguresToCommas(countryInfo.deaths)}
            />

            <InfoBox
              title="Criticals"
              plus={prettyPrintStat(countryInfo.critical)}
              total={NormalFiguresToCommas(countryInfo.criticalPerOneMillion)}
              hideTotal
              hidePlus
            />
          </div>

          <Map
            mapType={mapDisplayDataType}
            center={mapCenter}
            zoom={mapZoom}
            countries={mapCountries}
          />
        </div>
        <Card className="app__right flexColumn">
          <div className="appRight__top">
            <h3>Live Cases by Countries</h3>
            <Table listData={tableListData} />
          </div>
          <div className="appRight__bottom">
            <LineGraph
              sideBarGraph
              graphDataDuration="25"
              graphTagline="Worldwide New Cases"
              setGraphType={mapDisplayDataType}
              needTagline
              mapTagline="Worldwide New Deaths"
            />
          </div>
        </Card>
      </div>
      <div className="appBottom">
        <LineGraph
          needGraphSwitchingButtons
          setGraphType={graphDataType}
          graphDataDuration={graphDuration}
        />
      </div>
    </div>
  );
};

export default Homepage;
