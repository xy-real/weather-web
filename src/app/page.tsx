import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <main className="weather-app">
      <SearchBar />
      <WeatherCard />
    </main>
  );
}
