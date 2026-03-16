"use client";

import { SearchForm } from "@/components/weather/search-form";
import { WeatherCard } from "@/components/weather/weather-card";
import { WeatherProvider } from "@/context/weather-context";

export function WeatherApp() {
  return (
    <WeatherProvider>
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <SearchForm />
        <WeatherCard />
      </div>
    </WeatherProvider>
  );
}
