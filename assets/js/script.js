// VARIABLES
let selectForm = document.querySelector("#countryForm");
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
                countryRow.setAttribute("data-iso2", country.iso2);
                countryRow.setAttribute("data-countryName", country.name);
                // add text country name
                countryRow.innerHTML = country.name;
                // append
                selectBar.appendChild(countryRow);
            });
        })
        .catch((error) => console.log("error", error));
}

// populate dropdown with country specific api info
function fetchChosenCountryData() {
    let validate = new Headers();
    validate.append("X-CSCAPI-KEY", "UFVhZmZRcFNQM3luREtqTUhOS0lCMXVNOUQ2UHZ2R01VakNqZ3RtcA==");

    let requestOptions = {
        method: "GET",
        headers: validate,
        redirect: "follow",
    };
    const countryIso = this.selectedOptions[0].getAttribute("data-iso2");
    let fetchCountriesURL = `https://api.countrystatecity.in/v1/countries/${countryIso}`;

    fetch(fetchCountriesURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
        })
        .catch((error) => console.log("error", error));
}

// handle dropdown choice
// call flag api
function fetchFlag(event) {
    event.preventDefault();
    console.log(event);
    // TODO: use variable in this url to make
    const countryIso = this.selectedOptions[0].getAttribute("data-iso2");
    let fetchFlagsURL = `https://countryflagsapi.com/png/${countryIso}`;

    fetch(fetchFlagsURL)
        .then((response) => response.blob())
        .then((result) => {
            console.log(result);
            let flagURL = URL.createObjectURL(result);
            document.getElementById("showFlag").innerHTML = `<img class="helloFlag" src="${flagURL}" >`;
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
fetchCurrencyRates();
selectBar.addEventListener("change", fetchFlag);
selectBar.addEventListener("change", fetchChosenCountryData);
