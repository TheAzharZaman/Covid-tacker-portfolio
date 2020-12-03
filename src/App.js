import React from "react";
import TrackerLogo from "./tracker_logo.png";
import WorldwideIcon from "./worldwideIcon.png";
import { FormControl, Select, MenuItem, Card, Avatar } from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table";
import LineGraph from "./Components/LineGraph";

import {
  sortData,
  NormalFiguresToCommas,
  prettyPrintStat,
  prettyPrintStatPlus,
} from "./Files/utilities";

const App = () => {
  const [countryNames, setCountryNames] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("worldwide");
  const [countryInfo, setCountryInfo] = React.useState({});
  const [tableListData, setTableListData] = React.useState([]);
  const [mapCountries, setMapCountries] = React.useState([]);
  const [mapDisplayDataType, setMapDisplayDataType] = React.useState("cases");

  const [mapCenter, setMapCenter] = React.useState({
    lat: "41.3999",
    lng: "-4.2245",
  });

  const [graphDataType, setGraphDataType] = React.useState("cases");

  const [mapZoom, setMapZoom] = React.useState(2.5);

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

  // console.log("Country Info Fetched Successfully =>>>", countryInfo);

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
              <div className="account flexRow evenly center">
                <h3>Azhar Zaman</h3>
                <Avatar
                  className="pointer"
                  src="https://lh3.googleusercontent.com/ogw/ADGmqu8ke_KgtPSinHyRfqKhkzdggOOAkcLKrgW6E86ghg=s32-c-mo"
                />
              </div>

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
              title="Cases"
              plus={prettyPrintStatPlus(countryInfo.todayCases)}
              total={NormalFiguresToCommas(countryInfo.cases)}
            />

            <InfoBox
              onClick={(e) => {
                setMapDisplayDataType("recovered");
              }}
              title="Recovered"
              plus={prettyPrintStatPlus(countryInfo.todayRecovered)}
              total={NormalFiguresToCommas(countryInfo.recovered)}
            />

            <InfoBox
              onClick={(e) => {
                setMapDisplayDataType("deaths");
              }}
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
        <h3 className="graphical__tagline">Graphical Stats</h3>
        <LineGraph
          // needGraphSwitchingButtons
          graphDataDuration="150"
          needTagline
          mapTagline="Worldwide New Cases"
          setGraphType="cases"
        />
        <LineGraph
          graphDataDuration="150"
          needTagline
          mapTagline="Worldwide New Recovered"
          setGraphType="recovered"
        />
        <LineGraph
          graphDataDuration="150"
          needTagline
          mapTagline="Worldwide New Deaths"
          setGraphType="deaths"
        />
      </div>
    </div>
  );
};

export default App;
