const APP_ID = "bf11d86914a69c9b2cdd9dc79acb8b2d";

const searchInput = document.querySelector("#search-input");

const cityName = document.querySelector(".city-name");
const weatherState = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather(e.target.value);
  }
});

getWeather("Hanoi");

async function getWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=metric`
    );

    const data = await res.json();
    if (data.cod !== 200) return;

    const weather = data.weather[0].main.toLowerCase();

    cityName.innerText = data.name;
    weatherState.innerText = data.weather[0].description;

    weatherIcon.src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    temperature.innerText = Math.round(data.main.temp) + "°C";

    sunrise.innerText = convertTime(data.sys.sunrise);
    sunset.innerText = convertTime(data.sys.sunset);
    humidity.innerText = data.main.humidity;
    windSpeed.innerText = (data.wind.speed * 3.6).toFixed(1);

    getForecast(city);

    document.getElementById("food-tip").innerText =
      getFoodSuggestion(weather, data.main.temp);

    changeBackground(weather);

  } catch (err) {
    console.error("Weather error:", err);
  }
}


async function getForecast(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APP_ID}&units=metric`
    );

    const data = await res.json();
    if (data.cod !== "200") return;

    renderHourly(data.list);
    renderDaily(data.list);

  } catch (err) {
    console.error("Forecast error:", err);
  }
}

function renderHourly(list) {
  const hourlyEl = document.getElementById("hourly");
  hourlyEl.innerHTML = "";

  const now = new Date();

  const upcoming = list
    .filter(item => new Date(item.dt * 1000) > now)
    .slice(0, 6);

  upcoming.forEach((item, index) => {
    const time = new Date(item.dt * 1000).getHours() + ":00";
    const temp = Math.round(item.main.temp);
    const icon = item.weather[0].icon;

    hourlyEl.innerHTML += `
      <div class="forecast-item ${index === 0 ? "active" : ""}">
        <p>${time}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png">
        <p>${temp}°C</p>
      </div>
    `;
  });
}

function renderDaily(list) {
  const dailyEl = document.getElementById("daily");
  dailyEl.innerHTML = "";

  const dailyData = {};

  list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const key = date.toISOString().split("T")[0]; 

    if (!dailyData[key]) {
      dailyData[key] = {
        temps: [],
        icon: item.weather[0].icon,
        day: date.toLocaleDateString("en-US", { weekday: "short" })
      };
    }

    dailyData[key].temps.push(item.main.temp);
  });

  const days = Object.values(dailyData).slice(0, 5);

  days.forEach((dayData, index) => {
    const min = Math.min(...dayData.temps);
    const max = Math.max(...dayData.temps);

    dailyEl.innerHTML += `
      <div class="forecast-item ${index === 0 ? "active" : ""}">
        <p>${dayData.day}</p>
        <img src="https://openweathermap.org/img/wn/${dayData.icon}.png">
        <p>${Math.round(min)}° / ${Math.round(max)}°</p>
      </div>
    `;
  });
}


function convertTime(unix) {
  const date = new Date(unix * 1000);
  return date.getHours().toString().padStart(2, "0") + ":" +
         date.getMinutes().toString().padStart(2, "0");
}


function changeBackground(weather) {
  if (weather.includes("rain"))
    document.body.style.background = "linear-gradient(#4b79a1, #283e51)";
  else if (weather.includes("cloud"))
    document.body.style.background = "linear-gradient(#757f9a, #d7dde8)";
  else if (weather.includes("clear"))
    document.body.style.background = "linear-gradient(#fceabb, #f8b500)";
  else
    document.body.style.background = "linear-gradient(#1d4350, #a43931)";
}


function getFoodSuggestion(weather, temp) {
  if (weather.includes("rain")) {
    return "🌧 Rainy day — hot pot 🍲 or noodles 🍜 would be perfect!";
  }

  if (weather.includes("cloud")) {
    return "☁️ Cloudy — BBQ 🍖 sounds great!";
  }

  if (weather.includes("clear")) {
    if (temp > 30) {
      return "☀️ Hot weather — cold drinks 🧋 or salad 🥗!";
    } else {
      return "🌤 Nice weather — perfect for dining out 🍝!";
    }
  }

  if (temp < 20) {
    return "❄️ Cold — soup 🍲 or hot tea 🍵 is ideal!";
  }

  return "🍽 Anything sounds good today 😋";
}