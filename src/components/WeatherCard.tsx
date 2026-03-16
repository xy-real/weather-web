"use client";

import { useWeather } from "@/context/WeatherContext";

function getWeatherEmoji(weatherId: number): string {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 400) return "🌦️";
  if (weatherId >= 500 && weatherId < 600) return "🌧️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId === 801) return "🌤️";
  if (weatherId === 802) return "⛅";
  return "☁️";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export default function WeatherCard() {
  const { weatherData, loading, error } = useWeather();

  if (loading) {
    return (
      <div className="weather-card">
        <div className="card-state">
          <div className="spinner" />
          <p>Fetching weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <div className="card-state error-state">
          <span className="state-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="weather-card">
        <div className="card-state">
          <span className="state-icon">🔍</span>
          <p>Search for a city to see the weather</p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card">
      <div className="location">
        {weatherData.city}, {weatherData.country}
      </div>
      <div className="date">{getFormattedDate()}</div>
      <div className="weather-icon">
        {getWeatherEmoji(weatherData.weatherId)}
      </div>
      <div className="temperature">{weatherData.temperature}°C</div>
      <div className="description">{weatherData.description}</div>
      <div className="details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weatherData.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {weatherData.windSpeed.toFixed(1)} m/s
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{weatherData.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}
