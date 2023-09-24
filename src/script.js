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

function showWeather(response) {
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#weather-unit").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let unit = "metric";
  let apiKey = "5af297a6d7993b7bb3c2ec51eeeaccd4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
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
  let weatherUnit = document.querySelector("#weather-unit");
  let unit = weatherUnit.innerHTML;
  unit = Number(unit);
  weatherUnit.innerHTML = Math.round(((unit - 32) * 5) / 9);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let weatherUnit = document.querySelector("#weather-unit");
  let unit = weatherUnit.innerHTML;
  unit = Number(unit);
  weatherUnit.innerHTML = Math.round((unit * 9) / 5 + 32);
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

let fahrenheit = document.querySelector("#fahrenheit-unit");
fahrenheit.addEventListener("click", convertToFahrenheit);
let celsius = document.querySelector("#celsius-unit");
celsius.addEventListener("click", convertToCelsius);

search("San Francisco");
