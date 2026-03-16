"use client";

import Image from "next/image";

import { useWeather } from "@/context/weather-context";

export function ForecastCard() {
  const {
    state: { forecast, isLoading, selectedWeather },
  } = useWeather();

  return (
    <section className="forecast-card">
      <p className="forecast-card__label">5-day forecast</p>

      {!selectedWeather && isLoading ? (
        <p className="forecast-card__empty" role="status" aria-live="polite">
          Loading forecast data...
        </p>
      ) : null}

      {!forecast.length && !isLoading ? (
        <p className="forecast-card__empty">Search for a city to see the 5-day forecast.</p>
      ) : null}

      {forecast.length ? (
        <div className="forecast-grid">
          {forecast.map((day) => (
            <article key={day.date} className="forecast-item">
              <p className="forecast-item__day">{day.dayLabel}</p>
              <Image
                src={day.iconUrl}
                alt={`${day.condition} icon`}
                width={56}
                height={56}
                loading="lazy"
                sizes="56px"
                className="forecast-item__icon"
              />
              <p className="forecast-item__temp">{day.temperature}°C</p>
              <p className="forecast-item__condition">{day.condition}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
