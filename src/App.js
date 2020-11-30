import React from "react";
import TrackerLogo from "./tracker_logo.png";
import WorldwideIcon from "./worldwideIcon.png";
import { FormControl, Select, MenuItem, Card, Avatar } from "@material-ui/core";
import InfoBox from "./Components/InfoBox";
import Map from "./Components/Map";

const App = () => {
  const [countryNames, setCountryNames] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState("worldwide");
  const [countryInfo, setCountryInfo] = React.useState({});

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

  function ConvertToCommas(x) {
    x = parseInt(x);
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }

  return (
    <div className="app flexRow">
      <div className="app__left">
        {/* Header Section */}

        <div className="app__header flexRow between center">
          <img className="logo" src={TrackerLogo} alt="COVID-19 TRACKER" />

          <div className="flexRow evenly center">
            <div className="account flexRow evenly center">
              <h3>Azhar Zaman</h3>
              <Avatar />
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
            total={ConvertToCommas(countryInfo.cases)}
          />
          <InfoBox
            title="Active"
            plus={countryInfo.active}
            total={ConvertToCommas(countryInfo.activePerOneMillion)}
            hideTotal
            hidePlus
          />
          <InfoBox
            title="Recovered"
            plus={countryInfo.todayRecovered}
            total={ConvertToCommas(countryInfo.recovered)}
          />
          <InfoBox
            title="Criticals"
            plus={countryInfo.critical}
            total={ConvertToCommas(countryInfo.criticalPerOneMillion)}
            hideTotal
            hidePlus
          />
          <InfoBox
            title="Deaths"
            plus={countryInfo.todayDeaths}
            total={ConvertToCommas(countryInfo.deaths)}
          />
        </div>

        {/* App Map */}

        <Map />
      </div>
      <Card className="app__right flexColumn evenly center">
        <h3>List of Countries</h3>
        <h3>Graphical Representation</h3>
      </Card>
    </div>
  );
};

export default App;
