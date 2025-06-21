    import React, { useState, useEffect } from "react";
    
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
        .catch((error) => {console.error("Error fetching Countries:", error);
    setCountries([]); //only 1 option exists in the dropdown.
});
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
        <div style={{ padding: "4px", textAlign: "center" }}>
        <h1>
            Select Location
        </h1>

        <div style={{
            marginTop: "4px",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            }}
        >
            {/* Country Dropdown */}
              
                <select
                       value={selectedCountry}
                       onChange={(e) => {
                       setSelectedCountry(e.target.value);
                       setSelectedState("");
                      setSelectedCity("");
    }}
    style={{padding: "8px", minWidth: "200px", height: "40px", fontSize: "16px" }}
  >
    <option value="">Select Country</option>
    {countries.map((country) => ( 
      <option key={country} value={country}>
        {country}
      </option>
    ))}
  </select>
    
            {/* State Dropdown */}
    
            <select
            
                value={selectedState}
                onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity("");
                }}
                disabled={!selectedCountry}
                style={{padding: "8px", minWidth: "200px", height: "40px", fontSize: "16px" }}
            >
                <option value="">Select State</option>
                {states.map((state) => (
                <option key={state} value={state}>
                    {state}
                </option>
                ))}
            </select>
            

            {/* City Dropdown */}
            <select

                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}

                disabled={!selectedState}
                style={{padding: "8px", minWidth: "200px", height: "40px", fontSize: "16px" }}
            >
                 <option value="">Select City</option>
                {cities.map((city) => (
                <option key={city} value={city}>
                    {city}
                </option>
                ))}
            </select>
          </div>
        
        {/* Selected result */}
        {selectedCountry && selectedState && selectedCity && (
            <p style = {{marginTop: "4px", fontSize: "25px"}}>
            You selected {selectedCity}, {selectedState}, {selectedCountry}
            </p>
        )}
       </div>
    );
    }

    export default SelectLocation;
