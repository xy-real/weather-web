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
            onChange={(event) =>
              dispatch({ type: "SET_QUERY", payload: event.target.value })
            }
            placeholder="e.g. London"
            className="search-form__input"
          />
        </label>

        <button type="submit" className="search-form__btn">
          Search city
        </button>
      </form>

      <p className="search-hint">
        Try: {availableCities.join(", ")}
      </p>

      {state.error ? (
        <p className="search-error">{state.error}</p>
      ) : null}
    </section>
  );
}
