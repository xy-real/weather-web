"use client";

import { useState, FormEvent } from "react";
import { useWeather } from "@/context/WeatherContext";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const { fetchWeather, loading } = useWeather();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetchWeather(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
        disabled={loading}
        aria-label="City name"
      />
      <button
        type="submit"
        disabled={loading || !inputValue.trim()}
        className="search-btn"
      >
        {loading ? "..." : "Search"}
      </button>
    </form>
  );
}
