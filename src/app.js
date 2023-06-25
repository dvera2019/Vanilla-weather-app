function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.country;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function search(query) {
  let apiKey = "0bfe478a8b8a7te3aao74dc34b69a3b6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  convertToCelsius.classList.remove("active");
  convertToFahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  convertToCelsius.classList.add("active");
  convertToFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let convertToFahrenheit = document.querySelector("#fahrenheit-temp");
convertToFahrenheit.addEventListener("click", showFahrenheitTemp);

let convertToCelsius = document.querySelector("#celsius-temp");
convertToCelsius.addEventListener("click", showCelsiusTemp);

search("London");
