import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentWeather } from '../services/openMeteo'

const WEATHER_LABELS = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  61: 'Light rain',
  80: 'Rain showers',
}

export default function AttractionDetail() {
  const { state: attraction } = useLocation()
  const navigate = useNavigate()
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!attraction?.lat || !attraction?.lon) {
      setLoading(false)
      return
    }
    getCurrentWeather(attraction.lat, attraction.lon)
      .then((data) => {
        setWeather(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [attraction])

  // If someone lands here directly (no state passed), send them back to browse.
  if (!attraction) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          No attraction selected
        </h1>
        <p className="mt-3 text-ink/60">
          Head back to Explore and pick a spot to see its details here.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="mt-6 rounded-full bg-gradient-to-r from-cyan to-magenta px-6 py-3 font-semibold text-ink shadow-md"
        >
          Back to Explore
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <button
        onClick={() => navigate(-1)}
        className="font-body text-sm text-ink/50 hover:text-ink"
      >
        ← Back
      </button>

      <div className="mt-4 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
        <div className="aspect-[16/9] w-full bg-ink/5">
          {attraction.photo ? (
            <img
              src={attraction.photo}
              alt={attraction.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-5xl">
              📍
            </div>
          )}
        </div>

        <div className="p-8">
          <p className="font-body text-xs uppercase tracking-wide text-magenta">
            {attraction.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">
            {attraction.name}
          </h1>

          <div className="mt-6 rounded-2xl bg-ink/5 p-5">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/50">
              Current weather
            </h2>
            {loading && (
              <p className="mt-2 text-sm text-ink/50">Loading…</p>
            )}
            {!loading && weather && (
              <p className="mt-2 font-body text-lg text-ink">
                {weather.temperature_2m}°C ·{' '}
                {WEATHER_LABELS[weather.weather_code] ??
                  `Code ${weather.weather_code}`}
              </p>
            )}
            {!loading && !weather && (
              <p className="mt-2 text-sm text-ink/50">
                Weather unavailable for this spot.
              </p>
            )}
          </div>

          <button className="mt-6 w-full rounded-full bg-gradient-to-r from-cyan to-magenta py-3 font-display font-bold text-ink shadow-md transition-transform hover:-translate-y-0.5">
            Save to trip
          </button>
        </div>
      </div>
    </main>
  )
}
