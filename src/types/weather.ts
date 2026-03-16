export type WeatherCondition =
  | "Sunny"
  | "Cloudy"
  | "Rainy"
  | "Stormy"
  | "Snowy"
  | "Windy";

export type WeatherData = {
  city: string;
  temperature: number;
  condition: WeatherCondition;
  icon: string;
};
