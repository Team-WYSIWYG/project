// VARIABLES
let isoCode = "";
let selectBar = document.querySelector("#country-select");

// FUNCTIONS
// country api call
function fetchCountries() {
    let validate = new Headers();
    validate.append("X-CSCAPI-KEY", "UFVhZmZRcFNQM3luREtqTUhOS0lCMXVNOUQ2UHZ2R01VakNqZ3RtcA==");

    let requestOptions = {
        method: "GET",
        headers: validate,
        redirect: "follow",
    };

    let fetchCountriesURL = "https://api.countrystatecity.in/v1/countries";

    fetch(fetchCountriesURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            result.forEach((country) => {
                let countryRow = document.createElement("option");
                // give attributes for countries
                countryRow.setAttribute("iso2", country.iso2);
                countryRow.setAttribute("countryName", country.name);
                // add text country name
                countryRow.innerHTML = country.name;
                // append
                selectBar.appendChild(countryRow);
            });
        })
        .catch((error) => console.log("error", error));
}
// populate dropdown with country api info

// handle dropdown choice
// call flag api
function fetchFlag() {
    // TODO: use variable in this url to make
    let fetchFlagsURL = "https://countryflagsapi.com/png/ad";

    fetch(fetchFlagsURL)
        .then((response) => response.blob())
        .then((result) => {
            console.log(result);
            let flagURL = URL.createObjectURL(result);
            document.getElementById("showFlag").innerHTML = `<img src="${flagURL}" >`;
        })
        .catch((error) => console.log("error", error));
}

// call currency api
function fetchCurrencyRates() {
    let fetchRatesURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json";

    fetch(fetchRatesURL)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("showCrypto").innerHTML = `<div>ADA to BTC: ${result.btc.ada}</div>`;
        })
        .catch((error) => console.log("error", error));
}

// display flag and currency api info

// EVENTS
// ping country API to populate dropdown
fetchCountries();
// country select from dropdown
fetchFlag();
fetchCurrencyRates();
