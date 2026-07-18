// Public, keyless API — no auth needed.
// Docs: https://open-meteo.com/en/docs
const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export async function getCurrentWeather(lat, lon) {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch weather')
  const data = await res.json()
  return data.current
}
