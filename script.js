const apiKey = "c3e2cfd45376ca85bcb8a62d598eaa92";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const messages = document.getElementById("messages");
const details = document.getElementById("weatherDetails");

const weatherIconMap = {
  "01d": "images/sun.png",
  "01n": "images/sun.png",
  "02d": "images/cloudy.png",
  "02n": "images/cloudy.png",
  "03d": "images/drizzle.png",
  "03n": "images/drizzle.png",
  "04d": "images/drizzle.png",
  "04n": "images/drizzle.png",
  "09d": "images/rain.jpg",
  "09n": "images/rain.jpg",
  "10d": "images/rain.jpg",
  "10n": "images/rain.jpg",
  "13d": "images/snow.jpg",
  "13n": "images/snow.jpg",
};

function showMessage(text, cls = "loading-message") {
  messages.innerHTML = `<div class="${cls}">${text}</div>`;
}

async function fetchWeather(city) {
  if (!city) return;
  showMessage("Loading...");
  details.style.display = "none";

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404" || data.cod === "400") {
      showMessage("City Not Found", "city-not-found");
      return;
    }

    // Update UI
    document.getElementById("temp").textContent = `${Math.floor(data.main.temp)} °C`;
    document.getElementById("city").textContent = data.name;
    document.getElementById("country").textContent = data.sys.country;
    document.getElementById("latitude").textContent = data.coord.lat;
    document.getElementById("longitude").textContent = data.coord.lon;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} kmph`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src =
      weatherIconMap[iconCode] || "images/sun.png";

    messages.innerHTML = "";
    details.style.display = "block";
  } catch (err) {
    showMessage("Error fetching data", "error-message");
    console.error(err);
  }
}

// Events
searchBtn.addEventListener("click", () => fetchWeather(cityInput.value.trim()));
cityInput.addEventListener("keydown", e => {
  if (e.key === "Enter") fetchWeather(cityInput.value.trim());
});

// Load default city on start
fetchWeather("Chennai");
