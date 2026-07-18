// Private/keyed API — requires VITE_GEOAPIFY_KEY in .env
// Docs: https://apidocs.geoapify.com/docs/places/
const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY
const BASE_URL = 'https://api.geoapify.com/v2/places'

export async function getNearbyAttractions(lat, lon, radiusMeters = 5000, limit = 20) {
  const url = `${BASE_URL}?categories=tourism.attraction&filter=circle:${lon},${lat},${radiusMeters}&limit=${limit}&apiKey=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch attractions')
  const data = await res.json()
  return data.features
}
