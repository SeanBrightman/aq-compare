import logo from "./logo.svg";
import "./App.css";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CitySearch from "./Components/CitySearch";
import CityMeasurements from "./Components/CityMeasurements";
import DisplayParameters from "./Components/DisplayParameters";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>Compare U.S. City Air Quality</h1>
      </header>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DisplayParameters />
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardHeader title="City 1 Select" />
            <CitySearch />
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardHeader title="City 2 Select" />
            <CitySearch />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
