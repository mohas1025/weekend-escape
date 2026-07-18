// Private/keyed API — requires VITE_GEOAPIFY_KEY in .env
// Docs: https://apidocs.geoapify.com/docs/places/
const API_KEY = import.meta.env.VITE_GEOAPIFY_KEY;
const BASE_URL = "https://api.geoapify.com/v2/places";
const GEOCODE_URL = "https://api.geoapify.com/v1/geocode/search";

export async function getNearbyAttractions(
  lat,
  lon,
  radiusMeters = 5000,
  limit = 20,
) {
  const url = `${BASE_URL}?categories=tourism.attraction&filter=circle:${lon},${lat},${radiusMeters}&limit=${limit}&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch attractions");
  const data = await res.json();
  return data.features;
}

// Turns a free-text place name ("Austin, TX", "Griffith Park") into
// coordinates, so the user can search anywhere, not just a fixed city.
export async function geocodeLocation(query) {
  const url = `${GEOCODE_URL}?text=${encodeURIComponent(query)}&limit=1&apiKey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to find that location");
  const data = await res.json();
  const first = data.features?.[0];
  if (!first) throw new Error("No matching location found");
  return {
    lat: first.properties.lat,
    lon: first.properties.lon,
    label: first.properties.formatted,
  };
}
