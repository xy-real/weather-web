"use client";

import { FormEvent } from "react";

import { useWeather } from "@/context/weather-context";

export function SearchForm() {
  const { state, dispatch, availableCities } = useWeather();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "SEARCH_CITY" });
  }

  return (
    <section className="rounded-3xl border border-white/20 bg-white/95 p-6 shadow-lg shadow-sky-950/10">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          City search
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Search weather by city
        </h2>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Enter a city name
          <input
            type="text"
            value={state.query}
            onChange={(event) =>
              dispatch({ type: "SET_QUERY", payload: event.target.value })
            }
            placeholder="e.g. London"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-sky-500"
          />
        </label>

        <button
          type="submit"
          className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          Search city
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-500">
        Try: {availableCities.join(", ")}
      </p>

      {state.error ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}
    </section>
  );
}
