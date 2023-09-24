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
  console.log(response);
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    );
  document.querySelector("#city-name").innerHTML = response.data.city;

  document.querySelector("#weather-unit").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let unit = "metric";
  let apiKey = "2f2ob3ct1704051a7e5075a8a7ec2a7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
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
  let apiKey = "2f2ob3ct1704051a7e5075a8a7ec2a7e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${unit}`;
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
