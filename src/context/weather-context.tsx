"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

import { findWeatherByCity, weatherCatalog } from "@/data/weather-data";
import type { WeatherData } from "@/types/weather";

type WeatherState = {
  query: string;
  selectedWeather: WeatherData;
  error: string;
};

type WeatherAction =
  | { type: "SET_QUERY"; payload: string }
  | { type: "SEARCH_CITY" }
  | { type: "CLEAR_ERROR" };

const initialState: WeatherState = {
  query: weatherCatalog[0].city,
  selectedWeather: weatherCatalog[0],
  error: "",
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
    case "SEARCH_CITY": {
      const result = findWeatherByCity(state.query);

      if (!result) {
        return {
          ...state,
          error: `No weather data found for \"${state.query.trim()}\".`,
        };
      }

      return {
        ...state,
        selectedWeather: result,
        query: result.city,
        error: "",
      };
    }
    case "CLEAR_ERROR":
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
}

type WeatherContextValue = {
  state: WeatherState;
  dispatch: Dispatch<WeatherAction>;
  availableCities: string[];
};

const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      availableCities: weatherCatalog.map((entry) => entry.city),
    }),
    [state],
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
