async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('result');
  const errorDiv = document.getElementById('error');

  if (city === "") {
    errorDiv.textContent = "Please enter a city name.";
    resultDiv.style.display = "none";
    return;
  }

  const apiKey = "7a07f8911e64451db95111129240606"; // ✅ Free API key from WeatherAPI
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.current) {
      document.getElementById("cityName").textContent = `Weather in ${data.location.name}`;
      document.getElementById("temperature").textContent = `🌡 Temperature: ${data.current.temp_c} °C`;
      document.getElementById("description").textContent = `⛅ Condition: ${data.current.condition.text}`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.current.humidity}%`;
      document.getElementById("wind").textContent = `💨 Wind Speed: ${data.current.wind_kph} kph`;

      resultDiv.style.display = "block";
      errorDiv.textContent = "";
    } else {
      resultDiv.style.display = "none";
      errorDiv.textContent = "City not found. Please try again.";
    }
  } catch (error) {
    resultDiv.style.display = "none";
    errorDiv.textContent = "Something went wrong. Try again later.";
    console.error("Error:", error);
  }
}
