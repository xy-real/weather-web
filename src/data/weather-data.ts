import type { WeatherData } from "@/types/weather";

export const weatherCatalog: WeatherData[] = [
  {
    city: "London",
    temperature: 14,
    condition: "Cloudy",
    icon: "☁️",
  },
  {
    city: "Cairo",
    temperature: 29,
    condition: "Sunny",
    icon: "☀️",
  },
  {
    city: "Tokyo",
    temperature: 18,
    condition: "Rainy",
    icon: "🌧️",
  },
  {
    city: "New York",
    temperature: 11,
    condition: "Windy",
    icon: "🌬️",
  },
  {
    city: "Toronto",
    temperature: -2,
    condition: "Snowy",
    icon: "❄️",
  },
  {
    city: "Manila",
    temperature: 26,
    condition: "Stormy",
    icon: "⛈️",
  },
];

export function findWeatherByCity(query: string): WeatherData | undefined {
  const normalizedQuery = query.trim().toLowerCase();

  return weatherCatalog.find(
    (entry) => entry.city.toLowerCase() === normalizedQuery,
  );
}
