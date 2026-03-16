import { WeatherApp } from "@/components/weather/weather-app";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="page-wrapper">
      <div className="page-container">
        <header className="page-header">
          <div className="header-top-row">
            <p className="header-label">
              Weather Web · Real-time dashboard
            </p>
            <ThemeToggle />
          </div>
          <h1 className="header-title">
            Real-time weather dashboard with smart search and 5-day forecast
          </h1>
          <p className="header-subtitle">
            Search any city to view current conditions and a 5-day outlook,
            with fast cached results and a built-in dark/light theme toggle.
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
