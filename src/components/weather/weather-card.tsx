"use client";

import Image from "next/image";

import { useWeather } from "@/context/weather-context";

export function WeatherCard() {
  const {
    state: { selectedWeather, isLoading },
  } = useWeather();

  if (!selectedWeather) {
    return (
      <section className="weather-card">
        <p className="weather-card__label">Current weather</p>
        <div className="weather-card__empty" role="status" aria-live="polite">
          {isLoading ? "Loading weather data..." : "Search for a city to see weather data."}
        </div>
      </section>
    );
  }

  return (
    <section className="weather-card">
      <p className="weather-card__label">Current weather</p>

      <div className="weather-card__header">
        <div>
          <h2 className="weather-card__city">{selectedWeather.city}</h2>
          <p className="weather-card__condition">{selectedWeather.condition}</p>
        </div>
        <Image
          className="weather-card__icon-img"
          src={selectedWeather.iconUrl}
          alt={`${selectedWeather.condition} icon`}
          width={96}
          height={96}
        />
      </div>

      <div className="weather-card__stats">
        <article className="weather-stat">
          <p className="weather-stat__label">Temperature</p>
          <p className="weather-stat__value">{selectedWeather.temperature}°C</p>
        </article>

        <article className="weather-stat">
          <p className="weather-stat__label">Weather icon</p>
          <Image
            className="weather-stat__icon"
            src={selectedWeather.iconUrl}
            alt={`${selectedWeather.condition} icon`}
            width={64}
            height={64}
          />
        </article>
      </div>
    </section>
  );
}
