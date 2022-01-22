// VARIABLES
let selectForm = document.querySelector("#countryForm");
let selectBar = document.querySelector("#country-select");

// FUNCTIONS
// country api call
function fetchCountries() {
    // Fetching Country URL
    let fetchCountriesURL = "https://api.countrystatecity.in/v1/countries";
    // create API header
    let validate = new Headers();
    validate.append("X-CSCAPI-KEY", "UFVhZmZRcFNQM3luREtqTUhOS0lCMXVNOUQ2UHZ2R01VakNqZ3RtcA==");
    let requestOptions = {
        method: "GET",
        headers: validate,
        redirect: "follow",
    };

    // actually fetching data from variables in function
    fetch(fetchCountriesURL, requestOptions)
        //JSON parses response
        .then((response) => response.json())
        // Return JSON response CREAM FILLING
        .then((countries) => {
            console.log(countries);
            // adds value to options
            countries.forEach((country) => {
                let countryRow = document.createElement("option");
                // give attributes for countries
                countryRow.setAttribute("data-iso2", country.iso2);
                countryRow.setAttribute("data-countryName", country.name);
                // add text country name
                countryRow.innerHTML = country.name;
                // append
                selectBar.appendChild(countryRow);
            });
        })
        // if nothing is pulled, error is displayed
        .catch((error) => console.log("error", error));
}

// populate dropdown with country specific api info
function fetchChosenCountryData(countryIso) {
    let validate = new Headers();
    validate.append("X-CSCAPI-KEY", "UFVhZmZRcFNQM3luREtqTUhOS0lCMXVNOUQ2UHZ2R01VakNqZ3RtcA==");
    // allows user to utilize API and checks if it works
    let requestOptions = {
        method: "GET",
        headers: validate,
        redirect: "follow",
    };
    // Pulls selected data attribute from specific API Array
    // temperate literal grabbing
    let fetchCountriesURL = `https://api.countrystatecity.in/v1/countries/${countryIso}`;

    fetch(fetchCountriesURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            fetchCurrencyRates(result);
        })
        .catch((error) => console.log("error", error));
}

// handle dropdown choice
// call flag api
function fetchFlag() {
    document.getElementById("loadingMessage").innerHTML = `<div>loading</div>`;
    document.getElementById("showFlag").innerHTML = "";
    document.getElementById("showCrypto").innerHTML = "";
    const countryIso = this.selectedOptions[0].getAttribute("data-iso2");
    fetchChosenCountryData(countryIso);
    // TODO: use variable in this url to make
    let fetchFlagsURL = `https://countryflagsapi.com/png/${countryIso}`;

    fetch(fetchFlagsURL)
        .then((response) => response.blob())
        .then((result) => {
            document.getElementById("loadingMessage").innerHTML = "";
            console.log(result);
            let flagURL = URL.createObjectURL(result);
            document.getElementById("showFlag").innerHTML = `<img class="helloFlag" src="${flagURL}" >`;
        })
        .catch((error) => console.log("error", error));
}

// call currency api
function fetchCurrencyRates(countryData) {
    let fetchRatesURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json";
    let currency = countryData.currency;

    fetch(fetchRatesURL)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            console.log("currency", currency);
            document.getElementById("showCrypto").innerHTML = `<div>${result.btc[currency.toLowerCase()]} ${currency} = 1 BTC</div>`;
        })
        .catch((error) => console.log("error", error));
}

// display flag and currency api info

// EVENTS
// ping country API to populate dropdown
fetchCountries();
// country select from dropdown
selectBar.addEventListener("change", fetchFlag);
