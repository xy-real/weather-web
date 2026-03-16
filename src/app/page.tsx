import { WeatherApp } from "@/components/weather/weather-app";

export default function Home() {
  return (
    <main className="page-wrapper">
      <div className="page-container">
        <header className="page-header">
          <p className="header-label">
            Part 3 · Responsive design challenge
          </p>
          <h1 className="header-title">
            Weather dashboard — React, Next.js, TypeScript &amp; responsive CSS
          </h1>
          <p className="header-subtitle">
            This implementation uses CSS Flexbox &amp; Grid, 3 media queries
            (mobile / tablet / desktop), and cross-browser compatible styles.
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
