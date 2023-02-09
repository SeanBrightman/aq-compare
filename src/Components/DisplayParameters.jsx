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
import TablePagination from '@mui/material/TablePagination';

function DisplayParameters(props) {
  const [displayName, setDisplayName] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.openaq.org/v2/parameters?limit=100&page=1&offset=0&sort=asc&order_by=id"
    )
      .then((response) => response.json())
      .then((json) => setDisplayName(json.results));
  }, [props]);

  console.log(displayName);

  return (
    <TableContainer component={Paper}>
        <Table stickyHeader sx={{ width: 300 }} size="small" aria-label="aq-table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Parameter</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayName.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
              <TableCell align="right">
                {row.name}
              </TableCell>
                <TableCell align="right">
                  {row.displayName}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

export default DisplayParameters;
