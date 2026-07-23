import { useState, useEffect, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PageBanner from "../components/PageBanner";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import { subscribeTrips } from "../services/trips";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const VIBE_COLORS = {
  adventure: "#48CAE4",
  chill: "#0E7C86",
  foodie: "#E9C46A",
  scenic: "#073B4C",
};

const DEFAULT_CENTER = [34.0522, -118.2437];

export default function MapDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeTrips(user.uid, (data) => {
      setTrips(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  const located = useMemo(() => trips.filter((t) => t.lat && t.lon), [trips]);

  const chartData = useMemo(() => {
    const counts = {};
    trips.forEach((t) => {
      const v = t.vibe || "adventure";
      counts[v] = (counts[v] || 0) + 1;
    });
    return Object.entries(counts).map(([vibe, count]) => ({
      name: vibe,
      value: count,
    }));
  }, [trips]);

  const mapCenter =
    located.length > 0 ? [located[0].lat, located[0].lon] : DEFAULT_CENTER;

  if (authLoading) return null;

  if (!user) {
    return (
      <main>
        <PageBanner
          eyebrow="Trip overview"
          title="Map Dashboard"
          subtitle="Sign in to see your saved trips plotted on a map, with a breakdown by vibe."
        />
        <div className="mx-auto max-w-md px-6 py-16 text-center">
          <button
            onClick={() => setShowAuthModal(true)}
            className="rounded-full bg-gradient-to-r from-cyan to-magenta px-6 py-3 font-display font-bold text-ink shadow-md"
          >
            Sign in
          </button>
        </div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </main>
    );
  }

  return (
    <main>
      <PageBanner
        eyebrow="Trip overview"
        title="Map Dashboard"
        subtitle="Every spot you've saved, plotted together, with a breakdown by vibe."
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        {loading && (
          <p className="text-center text-sm text-ink/50">Loading your trips…</p>
        )}

        {!loading && trips.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink/20 p-10 text-center">
            <p className="text-sm text-ink/50">
              Nothing saved yet — save a trip from Explore to see it here.
            </p>
          </div>
        )}

        {!loading && trips.length > 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-sm lg:col-span-2">
              <MapContainer
                center={mapCenter}
                zoom={9}
                scrollWheelZoom={false}
                style={{ height: "480px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {located.map((trip) => (
                  <Marker
                    key={trip.id}
                    position={[trip.lat, trip.lon]}
                    icon={markerIcon}
                  >
                    <Popup>
                      <strong>{trip.name}</strong>
                      <br />
                      <span className="capitalize">{trip.vibe}</span>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">
                Trips by vibe
              </h2>
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {chartData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={VIBE_COLORS[entry.name] || "#48CAE4"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      formatter={(value) => (
                        <span className="capitalize text-ink/70">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
