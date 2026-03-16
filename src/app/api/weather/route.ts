import { NextResponse } from "next/server";

type OpenWeatherResponse = {
  cod: number | string;
  message?: string;
  name?: string;
  weather?: Array<{
    main: string;
    icon: string;
  }>;
  main?: {
    temp: number;
  };
};

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

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
    });

    const payload = (await response.json()) as OpenWeatherResponse;

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: `No weather data found for "${city}".` },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          message:
            payload.message || "Unable to fetch weather data from OpenWeather.",
        },
        { status: response.status },
      );
    }

    if (!payload.main || !payload.weather?.[0] || !payload.name) {
      return NextResponse.json(
        { message: "Received incomplete weather data from OpenWeather." },
        { status: 502 },
      );
    }

    const iconCode = payload.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    return NextResponse.json({
      city: payload.name,
      temperature: Math.round(payload.main.temp),
      condition: payload.weather[0].main,
      iconUrl,
    });
  } catch {
    return NextResponse.json(
      {
        message:
          "Network error while contacting OpenWeather. Check your connection and try again.",
      },
      { status: 503 },
    );
  }
}
