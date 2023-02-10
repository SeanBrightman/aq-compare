
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import CityMeasurements from "./CityMeasurements";

function CitySearch(props) {
  const [cityResults, setCityResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    //   fetch(
    //           'https://api.openaq.org/v1/cities?limit=10000&page=1&offset=0&sort=asc&country=' + props.country + '&order_by=city'
    //       )
    //     .then((response) => response.json())
    //     .then((json) => setCityResults(json.results));
    // }, [props]);

    fetch(
      "https://api.openaq.org/v1/cities?limit=10000&page=1&offset=0&sort=asc&country=US&order_by=city"
    )
      .then((response) => response.json())
      .then((json) => setCityResults(json.results))
      .catch((err) => console.error(err));
  }, [props]);

  const searchChangeHandler = (event, value) => {
    setSelectedCity(value);
  }

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
