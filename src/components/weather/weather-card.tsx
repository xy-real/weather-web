"use client";

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Wind,
} from "lucide-react";

import { useWeather } from "@/context/weather-context";

function renderWeatherIcon(condition: string, className: string) {
  const normalizedCondition = condition.toLowerCase();

  if (normalizedCondition.includes("clear")) {
    return <Sun className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  if (normalizedCondition.includes("thunder")) {
    return <CloudLightning className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  if (normalizedCondition.includes("drizzle")) {
    return <CloudDrizzle className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  if (normalizedCondition.includes("rain")) {
    return <CloudRain className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  if (normalizedCondition.includes("snow")) {
    return <CloudSnow className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  if (
    normalizedCondition.includes("mist") ||
    normalizedCondition.includes("fog") ||
    normalizedCondition.includes("haze") ||
    normalizedCondition.includes("smoke") ||
    normalizedCondition.includes("dust") ||
    normalizedCondition.includes("sand") ||
    normalizedCondition.includes("ash")
  ) {
    return <CloudFog className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  if (
    normalizedCondition.includes("squall") ||
    normalizedCondition.includes("tornado") ||
    normalizedCondition.includes("wind")
  ) {
    return <Wind className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
  }

  return <Cloud className={className} aria-label={`${condition} icon`} strokeWidth={2} />;
}

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
        {renderWeatherIcon(selectedWeather.condition, "weather-card__icon-img")}
      </div>

      <div className="weather-card__stats">
        <article className="weather-stat">
          <p className="weather-stat__label">Temperature</p>
          <p className="weather-stat__value">{selectedWeather.temperature}°C</p>
        </article>

        <article className="weather-stat">
          <p className="weather-stat__label">Weather icon</p>
          {renderWeatherIcon(selectedWeather.condition, "weather-stat__icon")}
        </article>
      </div>
    </section>
  );
}
