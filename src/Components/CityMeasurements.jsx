import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DisplayParameters from "./DisplayParameters";


function CityMeasurements(props) {
  const [cityMeasure, setCityMeasure] = useState([]);
  const [displayName, setDisplayName] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country=US&city=" + props.city + "&order_by=lastUpdated&dumpRaw=false"
    )
      .then((response) => response.json())
      .then((json) => setCityMeasure(json.results));

  }, [props]);

  
  

  console.log(cityMeasure);

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ width: 500 }} size="small" aria-label="aq-table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Parameter</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell align="right">Unit</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cityMeasure.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  {row.measurements[0].parameter}
                </TableCell>
                <TableCell align="right">{row.measurements[0].value}</TableCell>
                <TableCell align="right">{row.measurements[0].unit}</TableCell>
                
                <TableCell align="right">{row.location}</TableCell>

                <TableCell align="right">
                  {row.measurements[0].lastUpdated}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default CityMeasurements;
