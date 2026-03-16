import { NextResponse } from "next/server";

type OpenWeatherForecastResponse = {
  cod: string;
  message?: string;
  city?: {
    name?: string;
  };
  list?: Array<{
    dt: number;
    dt_txt: string;
    main?: {
      temp: number;
    };
    weather?: Array<{
      main: string;
      icon: string;
    }>;
  }>;
};

type OpenWeatherForecastEntry = {
  dt: number;
  dt_txt: string;
  main?: {
    temp: number;
  };
  weather?: Array<{
    main: string;
    icon: string;
  }>;
};

type ForecastItem = {
  date: string;
  dayLabel: string;
  temperature: number;
  condition: string;
  iconUrl: string;
};

function formatDayLabel(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
}

function selectFiveDayForecast(list: OpenWeatherForecastEntry[]) {
  const byDay = new Map<string, OpenWeatherForecastEntry[]>();

  for (const entry of list) {
    const dayKey = entry.dt_txt.slice(0, 10);
    if (!byDay.has(dayKey)) {
      byDay.set(dayKey, []);
    }
    byDay.get(dayKey)?.push(entry);
  }

  const days = Array.from(byDay.keys()).slice(0, 5);

  return days
    .map((day) => {
      const entries = byDay.get(day) || [];

      const preferred =
        entries.find((entry) => entry.dt_txt.includes("12:00:00")) || entries[0];

      if (!preferred?.main || !preferred.weather?.[0]) {
        return null;
      }

      const iconCode = preferred.weather[0].icon;

      const forecast: ForecastItem = {
        date: day,
        dayLabel: formatDayLabel(day),
        temperature: Math.round(preferred.main.temp),
        condition: preferred.weather[0].main,
        iconUrl: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
      };

      return forecast;
    })
    .filter((entry): entry is ForecastItem => entry !== null);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim();

  if (!city) {
    return NextResponse.json(
      { message: "Please enter a city name." },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "Missing OpenWeather API key in environment configuration." },
      { status: 500 },
    );
  }

  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
    });

    const payload = (await response.json()) as OpenWeatherForecastResponse;

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: `No forecast data found for "${city}".` },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          message:
            payload.message || "Unable to fetch forecast data from OpenWeather.",
        },
        { status: response.status },
      );
    }

    if (!payload.list?.length || !payload.city?.name) {
      return NextResponse.json(
        { message: "Received incomplete forecast data from OpenWeather." },
        { status: 502 },
      );
    }

    const forecast = selectFiveDayForecast(payload.list);

    return NextResponse.json({
      city: payload.city.name,
      forecast,
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Network error while contacting OpenWeather forecast service. Check your connection and try again.",
      },
      { status: 503 },
    );
  }
}
