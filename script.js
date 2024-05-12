function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
let todaysDate = new Date();
currentDate.innerHTML = formatDate(todaysDate);

// Show the temperature

function displayTemperature(response) {
  // Injected an icon
  let iconElement = document.querySelector("#current-temperature-icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" alt="current-temperature-icon"/>`;
  iconElement.innerHTML = `${icon}`;

  let temperatureElement = document.querySelector("#current-temperature-value");
  console.log(response);
  console.log(response.data);
  let unitElement = document.querySelector("#current-temperature-unit");
  let unit = `°C`;
  unitElement.innerHTML = unit;
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector(".current-city");
  let city = response.data.city;
  cityElement.innerHTML = `${city},`;

  let country = response.data.country;
  let countryElement = document.querySelector("#current-country");
  countryElement.innerHTML = country;

  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;

  let descriptionDetails = document.querySelector("#description-details");
  descriptionDetails.innerHTML = description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;
}

// an API Call

function searchCity(city) {
  let key = "b30a2d9fef22b5o0t83182be74814ec8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

// Get the data from the input

function showCity(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}
// show a dafault city

let form = document.querySelector("#search-form");
console.log("form");
form.addEventListener("submit", showCity, formatDate);

searchCity("Zurich");
