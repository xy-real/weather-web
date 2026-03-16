import { WeatherApp } from "@/components/weather/weather-app";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="page-wrapper">
      <div className="page-container">
        <header className="page-header">
          <div className="header-top-row">
          <p className="header-label">
            Part 5 · Performance optimization
          </p>
            <ThemeToggle />
          </div>
          <h1 className="header-title">
            Weather dashboard — optimized with theme toggle and 5-day forecast
          </h1>
          <p className="header-subtitle">
            Implements localStorage caching, lazy-loaded optimized forecast
            icons, dark/light mode, and an OpenWeather-based 5-day forecast.
          </p>
        </header>

        <WeatherApp />
      </div>

      {/* Responsive breakpoint indicator badge */}
      <div className="responsive-badge" aria-hidden="true">
        <span className="responsive-badge__dot" />
        <span className="responsive-badge__mobile">📱 Mobile</span>
        <span className="responsive-badge__tablet">📋 Tablet</span>
        <span className="responsive-badge__desktop">🖥️ Desktop</span>
      </div>
    </main>
  );
}
