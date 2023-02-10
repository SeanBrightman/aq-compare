
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import CitySearch from "./CitySearch";

function Search() {
  const [countryResults, setCountryResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetch(
            'https://api.openaq.org/v2/countries?limit=200&page=1&offset=0&sort=asc&order_by=country'
        )
      .then((response) => response.json())
      .then((json) => setCountryResults(json.results));
  }, []);

  const searchChangeHandler = (event, value) => {
    setSelectedCountry(value);
  }

  //console.log(selectedCountry.code);

  return (
    <Stack sx={{ width: 500, margin: "auto", align: "center" }}>
      <Autocomplete
        id="city-search-list"
        getOptionLabel={(countryResults) => countryResults.name ?? countryResults}
        options={countryResults}
        sx={{ width: 300 }}
        isOptionEqualToValue={(option, value) =>
            option.code === value.code
        }
        noOptionsText={"Country Does Not Exist"}
        renderInput={(params) => <TextField {...params} label="Search" />}
        onChange={searchChangeHandler}
      />
      <CitySearch country={selectedCountry.code}/>
      
    </Stack>
  );
}

export default Search;
