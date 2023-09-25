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

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let day = days[now.getDay()];

  return `${day}, ${month} ${date}`;
}

function formatTime(time) {
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function getForecast(coordinates) {
  let unit = "metric";
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3 d-flex justify-content-center">
    <div class="card text-center mb-3 forecast-card" style="width: 18rem">
        <h5 class="next-day">${formatDay(forecastDay.dt)}</h5>
          <img 
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" 
          alt="icon"
          class="forecast-icon"/>
        <div>
          <span class="max-temp">
            <strong>${Math.round(forecastDay.temp.max)}°C</strong>
          </span>
          <span class="min-temp">${Math.round(forecastDay.temp.min)}°C</span>
        </div>
    </div>
  </div>
</div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#weather-unit");
  let descriptionElement = document.querySelector("#weather-description");
  let huminidtyElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let feelsLikeElement = document.querySelector("#feels-like");

  celsiusTemperature = Math.round(response.data.main.temp);

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  cityElement.innerHTML = response.data.name;

  if (response.data.name === "Luxembourg Province") {
    cityElement.innerHTML = "Luxembourg";
  }
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  huminidtyElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  getForecast(response.data.coord);
}

function search(city) {
  let unit = "metric";
  let apiKey = "5af297a6d7993b7bb3c2ec51eeeaccd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "5af297a6d7993b7bb3c2ec51eeeaccd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function handleClick() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-unit");
  temperatureElement.innerHTML = celsiusTemperature;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-unit");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let now = new Date();
let h3 = document.querySelector("h3");
h3.innerHTML = formatDate(now);
let h1 = document.querySelector("h1");
h1.innerHTML = formatTime(now);

let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", searchCity);
let current = document.querySelector("#current-city");
current.addEventListener("click", handleClick);

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit-unit");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celsius = document.querySelector("#celsius-unit");
celsius.addEventListener("click", convertToCelsius);

search("San Francisco");
