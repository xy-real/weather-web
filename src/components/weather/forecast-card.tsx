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

function renderForecastIcon(condition: string, className: string) {
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
              {renderForecastIcon(day.condition, "forecast-item__icon")}
              <p className="forecast-item__temp">{day.temperature}°C</p>
              <p className="forecast-item__condition">{day.condition}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
