"use client";

import { useWeather } from "@/context/weather-context";

export function WeatherCard() {
  const {
    state: { selectedWeather },
  } = useWeather();

  return (
    <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-lg shadow-slate-950/20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
        Current weather
      </p>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold">{selectedWeather.city}</h2>
          <p className="mt-2 text-slate-300">{selectedWeather.condition}</p>
        </div>
        <div className="text-6xl" aria-hidden="true">
          {selectedWeather.icon}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-slate-300">Temperature</p>
          <p className="mt-2 text-4xl font-bold">{selectedWeather.temperature}°C</p>
        </article>

        <article className="rounded-2xl bg-white/10 p-4">
          <p className="text-sm text-slate-300">Weather icon</p>
          <p className="mt-2 text-4xl font-bold">{selectedWeather.icon}</p>
        </article>
      </div>
    </section>
  );
}
