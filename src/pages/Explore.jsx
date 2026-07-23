import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getNearbyAttractions, geocodeLocation } from "../services/geoapify";
import { getPhotoForQuery } from "../services/unsplash";
import AttractionCard from "../components/AttractionCard";
import PageBanner from "../components/PageBanner";

const DEFAULT_LAT = 34.0522;
const DEFAULT_LON = -118.2437;
const DEFAULT_LABEL = "Los Angeles, CA";
const MILES_TO_METERS = 1609.34;

// Each vibe maps to different Geoapify categories, so switching vibes
// actually changes what's returned instead of always querying the same
// generic "tourism.attraction" bucket.
const VIBE_CATEGORIES = {
  adventure: "natural,leisure.park,tourism.attraction.viewpoint",
  chill: "leisure.park,natural.water,catering.cafe,beach",
  foodie: "catering.restaurant,catering.cafe,catering.fast_food,catering.bar",
  scenic: "tourism.attraction.viewpoint,natural,tourism.sights,beach",
};

// Haversine distance in miles — used to sort results and as a fallback
// in case the API's own proximity ranking doesn't fully order them.
function distanceMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function Explore() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const radiusMiles = Number(searchParams.get("radius")) || 45;
  const vibe = searchParams.get("vibe") || "adventure";

  const [center, setCenter] = useState({
    lat: DEFAULT_LAT,
    lon: DEFAULT_LON,
    label: DEFAULT_LABEL,
  });
  const [locationInput, setLocationInput] = useState("");
  const [geocoding, setGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState(null);

  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  // Fetch attractions whenever the search center, radius, or vibe changes.
  useEffect(() => {
    let cancelled = false;

    async function loadAttractions() {
      setLoading(true);
      setError(null);
      try {
        const radiusMeters = Math.round(radiusMiles * MILES_TO_METERS);
        const categories = VIBE_CATEGORIES[vibe] || VIBE_CATEGORIES.adventure;
        const features = await getNearbyAttractions(
          center.lat,
          center.lon,
          radiusMeters,
          12,
          categories,
        );

        const named = features.filter((f) => f.properties?.name);

        const withPhotos = await Promise.all(
          named.map(async (f) => {
            const name = f.properties.name;
            let photo = null;
            try {
              photo = await getPhotoForQuery(`${name} travel landmark`);
            } catch {
              photo = null;
            }
            return {
              id: f.properties.place_id || f.properties.xid || name,
              name,
              category: (f.properties.categories?.[0] || "attraction").replace(
                /[._]/g,
                " ",
              ),
              lat: f.properties.lat,
              lon: f.properties.lon,
              distance: distanceMiles(
                center.lat,
                center.lon,
                f.properties.lat,
                f.properties.lon,
              ),
              photo,
            };
          }),
        );

        // Sort nearest-first so results have a clear, consistent order.
        withPhotos.sort((a, b) => a.distance - b.distance);

        if (!cancelled) {
          setAttractions(withPhotos);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadAttractions();
    return () => {
      cancelled = true;
    };
  }, [center, radiusMiles, vibe]);

  // Real-time filter — filters what's already loaded, no reload.
  const filtered = useMemo(() => {
    if (!query.trim()) return attractions;
    const q = query.toLowerCase();
    return attractions.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
  }, [attractions, query]);

  async function handleLocationSearch(e) {
    e.preventDefault();
    if (!locationInput.trim()) return;
    setGeocoding(true);
    setGeocodeError(null);
    try {
      const result = await geocodeLocation(locationInput);
      setCenter(result);
    } catch (err) {
      setGeocodeError(err.message);
    } finally {
      setGeocoding(false);
    }
  }

  return (
    <main>
      <PageBanner
        eyebrow={`${vibe} · within ${radiusMiles} mi of ${center.label}`}
        title="Explore nearby"
        subtitle="Live attraction data from Geoapify, with photos from Unsplash. Search any place, then filter instantly — no reload."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Location search — actually re-fetches from a new place */}
        <form
          onSubmit={handleLocationSearch}
          className="mx-auto flex max-w-md gap-2"
        >
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Search any city or place…"
            className="w-full rounded-full border border-ink/15 bg-white px-5 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-magenta focus:outline-none"
          />
          <button
            type="submit"
            disabled={geocoding}
            className="shrink-0 rounded-full bg-gradient-to-r from-cyan to-magenta px-5 py-3 text-sm font-semibold text-ink shadow-md disabled:opacity-60"
          >
            {geocoding ? "…" : "Go"}
          </button>
        </form>
        {geocodeError && (
          <p className="mt-2 text-center text-sm text-red-600">
            {geocodeError}
          </p>
        )}

        {/* Instant filter — narrows what's already loaded */}
        <div className="mx-auto mt-4 max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name or category…"
            className="w-full rounded-full border border-ink/10 bg-ink/5 px-5 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-magenta focus:outline-none"
          />
        </div>

        {loading && (
          <p className="mt-16 text-center text-sm text-ink/50">
            Finding spots near {center.label}…
          </p>
        )}

        {error && (
          <div className="mx-auto mt-16 max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
            Couldn't load attractions: {error}
            <br />
            Check that your Geoapify API key is set in <code>.env</code>.
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-ink/50">
            No spots match "{query}".
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <AttractionCard
                key={a.id}
                attraction={a}
                onClick={() => navigate(`/attraction/${a.id}`, { state: a })}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
