"use client";

import {
  createContext,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { suggestedCities } from "@/data/weather-data";
import type { ForecastData, WeatherData } from "@/types/weather";

const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_KEY_PREFIX = "weather-cache:";

type CachedPayload = {
  cachedAt: number;
  current: WeatherData;
  forecast: ForecastData[];
};

type WeatherState = {
  query: string;
  selectedWeather: WeatherData | null;
  forecast: ForecastData[];
  error: string;
  isLoading: boolean;
};

type WeatherAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: {
        current: WeatherData;
        forecast: ForecastData[];
      };
    }
  | { type: "FETCH_ERROR"; payload: string; clearSelectedWeather?: boolean };

const initialState: WeatherState = {
  query: "London",
  selectedWeather: null,
  forecast: [],
  error: "",
  isLoading: false,
};

function weatherReducer(
  state: WeatherState,
  action: WeatherAction,
): WeatherState {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
        error: "",
      };
    case "FETCH_START":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        selectedWeather: action.payload.current,
        forecast: action.payload.forecast,
        query: action.payload.current.city,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        selectedWeather: action.clearSelectedWeather
          ? null
          : state.selectedWeather,
        forecast: action.clearSelectedWeather ? [] : state.forecast,
        error: action.payload,
      };
    default:
      return state;
  }
}

async function fetchWeather(city: string) {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);

  const data = (await response.json()) as
    | WeatherData
    | {
        message: string;
      };

  if (!response.ok) {
    throw new Error(
      "message" in data
        ? data.message
        : "Unable to fetch weather data right now.",
    );
  }

  return data as WeatherData;
}

async function fetchForecast(city: string) {
  const response = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`);

  const data = (await response.json()) as
    | {
        city: string;
        forecast: ForecastData[];
      }
    | {
        message: string;
      };

  if (!response.ok) {
    throw new Error(
      "message" in data
        ? data.message
        : "Unable to fetch 5-day forecast right now.",
    );
  }

  if (!("forecast" in data)) {
    throw new Error("Unable to parse 5-day forecast response.");
  }

  return data.forecast;
}

function getCacheKey(city: string) {
  return `${CACHE_KEY_PREFIX}${city.trim().toLowerCase()}`;
}

function readCachedWeather(city: string): CachedPayload | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(getCacheKey(city));

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as CachedPayload;

    const isExpired = Date.now() - parsed.cachedAt > CACHE_TTL_MS;

    if (isExpired) {
      window.localStorage.removeItem(getCacheKey(city));
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(getCacheKey(city));
    return null;
  }
}

function writeCachedWeather(city: string, payload: CachedPayload) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getCacheKey(city), JSON.stringify(payload));
}

type WeatherContextValue = {
  state: WeatherState;
  setQuery: (value: string) => void;
  searchWeather: (city: string) => Promise<void>;
  suggestedCities: string[];
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const setQuery = (value: string) => {
    dispatch({ type: "SET_QUERY", payload: value });
  };

  const searchWeather = useCallback(async (cityInput: string) => {
    const city = cityInput.trim();

    if (!city) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Please enter a city name.",
        clearSelectedWeather: true,
      });
      return;
    }

    dispatch({ type: "FETCH_START" });

    try {
      const cached = readCachedWeather(city);

      if (cached) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            current: cached.current,
            forecast: cached.forecast,
          },
        });
        return;
      }

      const [current, forecast] = await Promise.all([
        fetchWeather(city),
        fetchForecast(city),
      ]);

      writeCachedWeather(city, {
        cachedAt: Date.now(),
        current,
        forecast,
      });

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          current,
          forecast,
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Network failure or service unavailable. Please check your connection and try again.";

      dispatch({
        type: "FETCH_ERROR",
        payload: errorMessage,
        clearSelectedWeather:
          errorMessage.toLowerCase().includes("no weather data found") ||
          errorMessage.toLowerCase().includes("no forecast data found") ||
          errorMessage.toLowerCase().includes("please enter a city name"),
      });
    }
  }, []);

  useEffect(() => {
    void searchWeather(initialState.query);
  }, [searchWeather]);

  const value = useMemo(
    () => ({
      state,
      setQuery,
      searchWeather,
      suggestedCities,
    }),
    [state, searchWeather],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }

  return context;
}
