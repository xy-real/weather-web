"use client";

import { ForecastCard } from "@/components/weather/forecast-card";
import { SearchForm } from "@/components/weather/search-form";
import { WeatherCard } from "@/components/weather/weather-card";
import { WeatherProvider } from "@/context/weather-context";

export function WeatherApp() {
  return (
    <WeatherProvider>
      <section className="weather-section">
        <div className="weather-grid">
          <SearchForm />
          <WeatherCard />
        </div>
        <ForecastCard />
      </section>
    </WeatherProvider>
  );
}
