import React, { useState, useEffect } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

// defining state variables to store fetched data.

function SelectLocation() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //defining state variable to store selected data.

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // fetch list of Countries on initial render

  useEffect(() => {
    axios
      .get(`https://crio-location-selector.onrender.com/countries`)
      .then((response) => setCountries(response.data)) // stores the response in state variable
      .catch((error) => console.error("Error fetching Countries:", error));
  }, []);

  // fetch States when Country is selected

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => setStates(response.data)) // store states
        .catch((error) => console.error("Error fetching States:", error));
    } else {
      //clear states & cities if no country selected.
      setStates([]);
      setSelectedState("");
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => setCities(response.data))
        .catch((error) => console.error("Error fetching Cities:", error));
    } else {
      // clear cities if no State selected
      setCities([]);
      setSelectedCity("");
    }
  }, [selectedState, selectedCountry]);

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3">
        Select Location
      </Typography>

      <Box mt = {4} 
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {/* Country Dropdown */}
        <FormControl sx={{ minWidth: 300}}>
          <InputLabel id="Select Country">Select Country</InputLabel>
          <Select
            labelId="Select-Country"
            value={selectedCountry}
            label="Select Country"
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
              setSelectedCity("");
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* State Dropdown */}
        <FormControl sx={{ minWidth: 200 }} disabled={!selectedCountry}>
          <InputLabel id="Select State">Select State</InputLabel>
          <Select
            labelId="Select-State"
            value={selectedState}
            label="Select State"
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* City Dropdown */}
        <FormControl sx={{ minWidth: 200 }} disabled={!selectedState}>
          <InputLabel id="Select City">Select City</InputLabel>
          <Select
            labelId="Select city"
            value={selectedCity}
            label="Select City"
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Selected result */}
      {selectedCountry && selectedState && selectedCity && (
        <Typography mt={4} sx={{fontSize: "25px"}}>
          You selected: {selectedCity}, {selectedState}, {selectedCountry}
        </Typography>
      )}
    </Box>
  );
}

export default SelectLocation;
