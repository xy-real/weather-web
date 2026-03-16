"use client";

import { useWeather } from "@/context/weather-context";

export function WeatherCard() {
  const {
    state: { selectedWeather },
  } = useWeather();

  return (
    <section className="weather-card">
      <p className="weather-card__label">Current weather</p>

      <div className="weather-card__header">
        <div>
          <h2 className="weather-card__city">{selectedWeather.city}</h2>
          <p className="weather-card__condition">{selectedWeather.condition}</p>
        </div>
        <div className="weather-card__icon" aria-hidden="true">
          {selectedWeather.icon}
        </div>
      </div>

      <div className="weather-card__stats">
        <article className="weather-stat">
          <p className="weather-stat__label">Temperature</p>
          <p className="weather-stat__value">{selectedWeather.temperature}°C</p>
        </article>

        <article className="weather-stat">
          <p className="weather-stat__label">Weather icon</p>
          <p className="weather-stat__value">{selectedWeather.icon}</p>
        </article>
      </div>
    </section>
  );
}
