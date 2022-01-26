// VARIABLES
let selectForm = document.querySelector("#countryForm");
let selectBar = document.querySelector("#country-select");
let recentSearchInit = localStorage.getItem("lastChosen");

// FUNCTIONS
// country api call
// https://countrystatecity.in/docs/api/country/
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

// handle dropdown choice
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
    // template literal using country code to tell api which country data to pull
    let fetchCountriesURL = `https://api.countrystatecity.in/v1/countries/${countryIso}`;

    fetch(fetchCountriesURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            // sends result data to currency rate function
            sendLocalStorage(result.name);
            fetchCurrencyRates(result);
        })
        .catch((error) => console.log("error", error));
}

// call flag api
// https://www.countryflagsapi.com/#howToUse
function fetchFlag() {
    // displays "loading" in between user choices
    document.getElementById("loadingMessage").innerHTML = `<div>loading</div>`;
    // Telling countryIso to equal the selected option from the API array "data-iso2"
    const countryIso = this.selectedOptions[0].getAttribute("data-iso2");
    fetchChosenCountryData(countryIso);
    //
    let fetchFlagsURL = `https://countryflagsapi.com/png/${countryIso}`;

    fetch(fetchFlagsURL)
        .then((response) => response.blob())
        .then((result) => {
            // dislpays a loading message while api is fetching flag data
            document.getElementById("loadingMessage").innerHTML = "";
            console.log(result);
            // creates URL to be used as image element src attribute
            let flagURL = URL.createObjectURL(result);
            // adds image to page
            document.getElementById("showFlag").innerHTML = `<img class="helloFlag" src="${flagURL}" >`;
        })
        // if nothing is pulled, error is displayed
        .catch((error) => console.log("error", error));
}

// call currency api
// https://github.com/fawazahmed0/currency-api
function fetchCurrencyRates(countryData) {
    let fetchRatesURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json";
    let currency = countryData.currency;
    //
    fetch(fetchRatesURL)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            console.log("currency", currency);
            // adds text to div element describing currency relation to Bitcoin
            document.getElementById("showCrypto").innerHTML = `<div>${result.btc[currency.toLowerCase()]} ${currency} = 1 BTC</div>`;
        })
        .catch((error) => console.log("error", error));
}

function sendLocalStorage(countryName) {
    let recentCountry = localStorage.getItem("lastChosen");
    document.getElementById("lastChosenCountry").innerHTML = recentCountry;
    localStorage.setItem("lastChosen", countryName);
}

// EVENTS
// initial ping of country API to populate dropdown
fetchCountries();
document.getElementById("lastChosenCountry").innerHTML = recentSearchInit;
// country select from dropdown
selectBar.addEventListener("change", fetchFlag);
