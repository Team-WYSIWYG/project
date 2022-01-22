// VARIABLES
let isoCode = "";

// FUNCTIONS
// country api call
function fetchCountries() {
    let countries = new Headers();
    countries.append("X-CSCAPI-KEY", "UFVhZmZRcFNQM3luREtqTUhOS0lCMXVNOUQ2UHZ2R01VakNqZ3RtcA==");

    let requestOptions = {
        method: "GET",
        headers: countries,
        redirect: "follow",
    };

    let fetchCountriesURL = "https://api.countrystatecity.in/v1/countries";

    fetch(fetchCountriesURL, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}
// populate dropdown with country api info

// handle dropdown choice
// call flag api
function fetchFlag() {
    // TODO: use variable in this url to make
    let fetchFlagsURL = "https://countryflagsapi.com/png/gl";

    fetch(fetchFlagsURL)
        .then((response) => response.blob())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}

// call currency api
function fetchCurrencyRates() {
    let fetchRatesURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json";

    fetch(fetchRatesURL)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}

// display flag and currency api info

// EVENTS
// ping country API to populate dropdown
fetchCountries();
// country select from dropdown
fetchFlag();
fetchCurrencyRates();
