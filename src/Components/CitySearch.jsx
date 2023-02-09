import axios from "axios";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import CityMeasurements from "./CityMeasurements";

function CitySearch() {
  const [cityResults, setCityResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetch(
            'https://api.openaq.org/v1/cities?limit=10000&page=1&offset=0&sort=asc&country=US&order_by=city'
        )
      .then((response) => response.json())
      .then((json) => setCityResults(json.results));
  }, []);

  const searchChangeHandler = (event, value) => {
    setSelectedCity(value);
  }

  const searchClickHandler = () => {
    setSelectedCity(cityResults);
  }
  //console.log(cityResults);

  return (
    <Stack sx={{ width: 500, margin: "auto", align: "center" }}>
      <Autocomplete
        id="city-search-list"
        getOptionLabel={(cityResults) => cityResults.city ?? cityResults}
        options={cityResults}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) =>
            option.city === value.city
        }
        noOptionsText={"City Does Not Exist"}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onChange={searchChangeHandler}
      />
      <CityMeasurements city={selectedCity.city}/>
    </Stack>
  );
}

export default CitySearch;
