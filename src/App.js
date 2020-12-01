import React from "react";
import TrackerLogo from "./tracker_logo.png";
import WorldwideIcon from "./worldwideIcon.png";
import { FormControl, Select, MenuItem, Card, Avatar } from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";
import Table from "./Components/Table";
import LineGraph from "./Components/LineGraph";

import { sortData, NormalFiguresToCommas } from "./Files/utilities";

const App = () => {
  const [countryNames, setCountryNames] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("worldwide");
  const [countryInfo, setCountryInfo] = React.useState({});
  const [tableListData, setTableListData] = React.useState([]);

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

    console.log("COUNTRY_CODE is =>>>", COUNTRY_CODE);
    console.log("Fetch Response from this API_CALL", API_URL);

    await fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  console.log("Country Info Fetched Successfully =>>>", countryInfo);

  return (
    <div className="app flexRow">
      <div className="app__left">
        {/* Header Section */}

        <div className="app__header flexRow between center">
          <img className="logo" src={TrackerLogo} alt="COVID-19 TRACKER" />

          <div className="flexRow evenly center">
            <div className="account flexRow evenly center">
              <h3>Azhar Zaman</h3>
              <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu8ke_KgtPSinHyRfqKhkzdggOOAkcLKrgW6E86ghg=s32-c-mo" />
            </div>

            <FormControl className="header__dropdown">
              <Select
                className="header__dropdownBox"
                variant="outlined"
                value={selectedCountry}
                onChange={onCountryChange}
              >
                <MenuItem className="listItem" value="worldwide">
                  <img className="dropdown__flagGlobal" src={WorldwideIcon} />{" "}
                  Worldwide
                </MenuItem>
                {countryNames.map((countryName) => (
                  <MenuItem className="listItem" value={countryName.code}>
                    <img className="dropdown__flag" src={countryName.flagSrc} />
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
            title="Cases"
            plus={countryInfo.todayCases}
            total={NormalFiguresToCommas(countryInfo.cases)}
          />
          <InfoBox
            title="Active"
            plus={countryInfo.active}
            total={NormalFiguresToCommas(countryInfo.activePerOneMillion)}
            hideTotal
            hidePlus
          />
          <InfoBox
            title="Recovered"
            plus={countryInfo.todayRecovered}
            total={NormalFiguresToCommas(countryInfo.recovered)}
          />
          <InfoBox
            title="Criticals"
            plus={countryInfo.critical}
            total={NormalFiguresToCommas(countryInfo.criticalPerOneMillion)}
            hideTotal
            hidePlus
          />
          <InfoBox
            title="Deaths"
            plus={countryInfo.todayDeaths}
            total={NormalFiguresToCommas(countryInfo.deaths)}
          />
        </div>

        {/* App Map */}

        {/* <Map /> */}
      </div>
      <Card className="app__right flexColumn evenly center">
        <div className="appRight__top">
          <h3>Live Cases by Countries</h3>
          <Table listData={tableListData} />
        </div>
        <div className="appRight__bottom">
          <h3>Worldwide New Cases</h3>
          <LineGraph />
        </div>
      </Card>
    </div>
  );
};

export default App;
