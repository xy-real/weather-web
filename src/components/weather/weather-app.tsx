"use client";

import { SearchForm } from "@/components/weather/search-form";
import { WeatherCard } from "@/components/weather/weather-card";
import { WeatherProvider } from "@/context/weather-context";

export function WeatherApp() {
  return (
    <WeatherProvider>
      <div className="weather-grid">
        <SearchForm />
        <WeatherCard />
      </div>
    </WeatherProvider>
  );
}
