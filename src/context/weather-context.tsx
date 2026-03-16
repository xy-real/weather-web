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
import type { WeatherData } from "@/types/weather";

type WeatherState = {
  query: string;
  selectedWeather: WeatherData | null;
  error: string;
  isLoading: boolean;
};

type WeatherAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: WeatherData }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: WeatherState = {
  query: "London",
  selectedWeather: null,
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
        selectedWeather: action.payload,
        query: action.payload.city,
        error: "",
      };
    case "FETCH_ERROR":
      return {
        ...state,
        isLoading: false,
        selectedWeather: state.selectedWeather,
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
      dispatch({ type: "FETCH_ERROR", payload: "Please enter a city name." });
      return;
    }

    dispatch({ type: "FETCH_START" });

    try {
      const weather = await fetchWeather(city);
      dispatch({ type: "FETCH_SUCCESS", payload: weather });
    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Network failure or service unavailable. Please check your connection and try again.",
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
