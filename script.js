const getWeatherBtn = document.getElementById("get-weather-btn");
const citySelect = document.getElementById("city-select");
const weatherInfo = document.getElementById("weather-info");

const weatherIcon = document.getElementById("weather-icon");
const locationEl = document.getElementById("location");
const mainTemp = document.getElementById("main-temperature");
const feelsLike = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const windGustEl = document.getElementById("wind-gust");
const weatherMainEl = document.getElementById("weather-main");

async function getWeather(city) {
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function showWeather(city) {
  const data = await getWeather(city);
  
  if (!data) {
    alert("Something went wrong, please try again later.");
    return;
  }

  weatherInfo.classList.remove("hidden");

  weatherIcon.src = data.weather?.[0]?.icon || "";
  weatherIcon.alt = data.weather?.[0]?.description || "N/A";
  locationEl.textContent = data.name || "N/A";
  mainTemp.textContent = data.main?.temp ?? "N/A";
  feelsLike.textContent = data.main?.feels_like ?? "N/A";
  humidityEl.textContent = data.main?.humidity ?? "N/A";
  windEl.textContent = data.wind?.speed ?? "N/A";
  windGustEl.textContent = data.wind?.gust ?? "N/A";
  weatherMainEl.textContent = data.weather?.[0]?.main || "N/A";
}

getWeatherBtn.addEventListener("click", () => {
  const city = citySelect.value;
  if (!city) return; 
  showWeather(city);
});