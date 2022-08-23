import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";
import { List, ListItem, ListItemText } from "@material-ui/core";

const countriesURL = "https://restcountries.com/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 220,
  },
  header:{
    backgroundColor: "#ffcc99",
  },
  countryName:{
    cursor: "pointer"
  },
  capitalName:{
    whiteSpace: "normal",
    wordBreak: "break-word"
  } 
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState("")
  const classes = useStyles();

  let openSidebarDrawer = (e,index) =>{
    e.preventDefault()
    setData(countriesData[index]);
    setOpenDrawer(true);
  }

  let closeSidebarDrawer = () =>{
    setOpenDrawer(false);
  }

  const getCountriesWithAxios = async () => {
    let response = await axios.get(countriesURL);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  return (
    <>
      <Drawer
            variant="temporary"
            open={openDrawer}
            onClose={closeSidebarDrawer}
            anchor="right"
      >
        Drawer

      </Drawer>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country, index) => (
                  <TableRow key={country.name} style ={ index % 2? { background : "#f2f2f2" }:{ background : "white" }}>
                    <TableCell component="th" scope="row" 
                      onClick={(e,index) => openSidebarDrawer(e,index)}
                      className={classes.countryName}>
                      {country.name}
                    </TableCell>
                    <TableCell align="right">
                      <img src={country.flags.svg} alt="" width="32px" />
                    </TableCell>
                    <TableCell className ={classes.capitalName} align="right">{country.capital??"N/A"}</TableCell>
                    <TableCell align="right">{country.population??"N/A"}</TableCell>
                    <TableCell align="right">{country.region??"N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
