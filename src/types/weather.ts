export type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  iconUrl: string;
};

export type ForecastData = {
  date: string;
  dayLabel: string;
  temperature: number;
  condition: string;
  iconUrl: string;
};
