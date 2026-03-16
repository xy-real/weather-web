import { WeatherApp } from "@/components/weather/weather-app";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
            Part 2 · Framework implementation
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Weather dashboard built with React, Next.js, TypeScript, and Tailwind CSS
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            This implementation uses reusable components, reducer-based state
            management, a city search input, and a structured file layout.
          </p>
        </header>

        <WeatherApp />
      </div>
    </main>
  );
}
