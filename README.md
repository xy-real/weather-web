# Weather Web (React + Next.js)

Part 4 implements OpenWeather API integration with secure API key usage.

## OpenWeather setup

1. Register and get an API key from OpenWeather.
2. Copy `.env.example` to `.env.local`.
3. Set your key:

```bash
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

`OPENWEATHER_API_KEY` is read only on the server route (`src/app/api/weather/route.ts`) and is not exposed to the browser.

## API documentation reviewed

This app uses the OpenWeather Current Weather endpoint:

- `GET https://api.openweathermap.org/data/2.5/weather`
- query params: `q`, `appid`, `units=metric`
- icon format: `https://openweathermap.org/img/wn/{icon}@2x.png`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Part 4 behaviors implemented

- API key usage via secure environment variable
- Invalid city input handling
- Network failure handling
- Loading spinner while fetching weather data
