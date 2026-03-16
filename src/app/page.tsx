import { WeatherApp } from "@/components/weather/weather-app";

export default function Home() {
  return (
    <main className="page-wrapper">
      <div className="page-container">
        <header className="page-header">
          <p className="header-label">
            Part 4 · API integration requirements
          </p>
          <h1 className="header-title">
            Weather dashboard — OpenWeather API integration
          </h1>
          <p className="header-subtitle">
            Uses secure environment variables for API key storage, server-side
            API key usage, invalid-city and network error handling, and a
            loading spinner during requests.
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
