# Weather Web (React + Next.js)

Weather Web is a city-based weather dashboard built with Next.js, React, TypeScript, and Tailwind/CSS, using OpenWeather as the data source.

The system supports city search, current weather display, 5-day forecast, API-backed state management, caching, and a persisted dark/light theme toggle.

## System overview

### Core user flow

1. User enters a city in the search form.
2. App requests weather data from internal Next.js API routes.
3. API routes call OpenWeather server-side using environment variables.
4. UI shows current weather and 5-day forecast.
5. Results are cached in `localStorage` (with TTL) to improve repeat-search performance.

### Features implemented

- Component-based architecture (`SearchForm`, `WeatherCard`, `ForecastCard`, `ThemeToggle`)
- City search input with validation
- Current weather display:
	- Temperature
	- Condition
	- Weather icon
- 5-day forecast display
- Reducer/context-based state management
- Error handling for:
	- Invalid city input
	- Network/API failures
- Loading states and spinner feedback
- Dark/light theme toggle with persisted preference

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS + custom CSS
- OpenWeather API
- Lucide React icons

## API integration

The app uses server-side API routes so the OpenWeather API key is never exposed to the client.

- Current weather route: `src/app/api/weather/route.ts`
- Forecast route: `src/app/api/forecast/route.ts`

OpenWeather endpoints used:

- `GET https://api.openweathermap.org/data/2.5/weather`
- `GET https://api.openweathermap.org/data/2.5/forecast`
- query params: `q`, `appid`, `units=metric`
- icon format: `https://openweathermap.org/img/wn/{icon}@2x.png`

## Performance optimizations

Implemented optimizations include:

- `localStorage` caching for current weather + forecast responses (TTL-based)
- Lazy-loaded forecast icons
- Optimized forecast icons with Next.js `Image`

## Theme system

- Manual dark/light toggle UI
- Preference persisted in `localStorage`
- Theme applied using `data-theme` on the document root

## Project structure

```text
src/
	app/
		api/
			weather/route.ts
			forecast/route.ts
		globals.css
		layout.tsx
		page.tsx
	components/
		theme-toggle.tsx
		weather/
			search-form.tsx
			weather-card.tsx
			forecast-card.tsx
			weather-app.tsx
	context/
		weather-context.tsx
	data/
		weather-data.ts
	types/
		weather.ts
```

## Setup

1. Create an OpenWeather account and API key.
2. Create `.env.local` at the project root.
3. Add:

```bash
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
