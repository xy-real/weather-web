"use client";

import { FormEvent } from "react";

import { useWeather } from "@/context/weather-context";

export function SearchForm() {
  const { state, setQuery, searchWeather, suggestedCities } = useWeather();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await searchWeather(state.query);
  }

  return (
    <section className="search-panel">
      <div>
        <p className="search-panel__label">City search</p>
        <h2 className="search-panel__heading">Search weather by city</h2>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-form__field">
          Enter a city name
          <input
            type="text"
            value={state.query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g. London"
            className="search-form__input"
          />
        </label>

        <button type="submit" className="search-form__btn" disabled={state.isLoading}>
          {state.isLoading ? "Searching..." : "Search city"}
        </button>
      </form>

      <p className="search-hint">
        Try: {suggestedCities.join(", ")}
      </p>

      {state.isLoading ? (
        <p className="search-loading" role="status" aria-live="polite">
          <span className="loading-spinner" aria-hidden="true" />
          Fetching weather data...
        </p>
      ) : null}

      {state.error ? (
        <p className="search-error">{state.error}</p>
      ) : null}
    </section>
  );
}
