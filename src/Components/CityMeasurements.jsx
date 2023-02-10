
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';


function CityMeasurements(props) {
  const [cityMeasure, setCityMeasure] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.openaq.org/v2/latest?limit=100&page=1&offset=0&sort=desc&radius=100&country=US&city=" + props.city + "&order_by=lastUpdated&dumpRaw=false"
    )
      .then((response) => response.json())
      .then((json) => setCityMeasure(json.results))
      .catch(err => console.error(err));

  }, [props]);





console.log(cityMeasure);

  return (
    <Card>
      <List
        sx={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          overflow: "auto",
          maxHeight: 500, "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {cityMeasure.map((item) => (
          <li key={item.location + Math.random()}>
            <ul>
              <ListSubheader>{item.location}</ListSubheader>
              {item.measurements.map((sItem) => (
                <ListItem key={sItem.parameter + Math.random()}>
                  <ListItemText primary={sItem.parameter} />
                  <ListItemText primary={sItem.value} />
                  <ListItemText secondary={sItem.unit} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>

      {/* <TableContainer component={Paper}>
        <Table sx={{ width: 500 }} size="small" aria-label="aq-table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Pollutants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cityMeasure.map((row) => (
              
              <TableRow
                key={row.id}
              >
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.measurements[0].lastUpdated}</TableCell>
                <TableCell>
                {row.measurements.map((sItem) => (
                  <List>
                  <ListItem key={sItem.value + sItem.parameter + sItem.unit}>
                    <ListItemText primary={sItem.parameter} />
                    <ListItemText secondary={sItem.value + sItem.unit} />
                  </ListItem>
                    </List>
            ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Card>
  );
}

export default CityMeasurements;
